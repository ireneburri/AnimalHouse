<template>
  <main class="memoryMain">
    <h2 class="pageTitle">Memory</h2>
    <transition-group tag="section" class="game-board container" name="shuffle-card">
      <Card
          v-for="card in cardList"
          :key="`${card.value}-${card.variant}`"
          :matched="card.matched"
          :name="card.name"
          :value="card.value"
          :visible="card.visible"
          :position="card.position"
          @select-card="flipCard"
      />
    </transition-group>
    <button v-if="newPlayer" @click="startGame" class="memoryButton">
      <img src="/images/play.svg" alt="Restart Icon" /> Start Game
    </button>
    <button v-else @click="restartGame" class="memoryButton" role="button" type="button">
      <img src="/images/restart.svg" alt="Restart Icon" /> Restart Game
    </button>
  </main>
</template>

<script>
import Card from '../components/Card'
import { watch} from "vue";
import _ from 'lodash'
import axios from "axios";
import { launchConfetti } from '../utilities/confetti'

export default {
  name: 'App',
  components: {
    Card
  },
  data() {
    return{
      cardList:[],
      userSelection:[],
      newPlayer:true,
      cardItems: [],
      cardItem:null,
      remainingCards:16,
      wait:0,
      var:1
    }
  },
  computed: {
    playerwins() {
      if (this.remainingPairs() === 0) {
        return 'Player wins'
      }
      return `remaining pairs ${this.remainingPairs()}`
    },
  },
  async created(){
    await axios.get('https://site212224.tw.cs.unibo.it/quiz/img/size/8')
        .then((response)=>{
              this.cardItems= response.data

              this.cardItems.forEach(item => {
                this.cardList.push({
                  value: item.img,
                  name: item.name,
                  variant: 1,
                  visible: false,
                  position: null,
                  matched: false
                })

                this.cardList.push({
                  value: item.img,
                  name: item.name,
                  variant: 2,
                  visible: true,
                  position: null,
                  matched: false
                })
              })

              this.cardList = this.cardList.map((card, index) => {
                return {
                  ...card,
                  position: index
                }
              })
              this.wait=1
            }
        ).catch((err)=>{
          console.log(err)
        })
  },
  methods:{

    startGame(){
      this.newPlayer=false
      this.restartGame()
    },
    restartGame(){
      this.var=1
      this.shuffleCards()
      this.cardList = this.cardList.map((card, index) => {
        return {
          ...card,
          matched: false,
          position: index,
          visible: false
        }})
    },
    shuffleCards(){
      this.cardList=_.shuffle(this.cardList)
    },
    remainingPairs(){
      this.remainingCards = this.cardList.filter(
          card => card.matched === false
      ).length
      return this.remainingCards / 2
    },
    flipCard(payload){
      this.cardList[payload.position].visible = true

      if (this.userSelection[0]) {
        if (
            this.userSelection[0].position === payload.position &&
            this.userSelection[0].faceValue === payload.faceValue
        ) {
          return
        } else {
          this.userSelection[1] = payload
        }
      } else {
        this.userSelection[0] = payload
      }
      this.remainingCards=this.remainingPairs()

      watch(
          this.userSelection,
          currentValue => {
            if (currentValue.length === 2) {
              const cardOne = currentValue[0]
              const cardTwo = currentValue[1]

              if (cardOne.faceValue === cardTwo.faceValue) {
                this.cardList[cardOne.position].matched = true
                this.cardList[cardTwo.position].matched = true
              } else {
                setTimeout(() => {
                  this.cardList[cardOne.position].visible = false
                  this.cardList[cardTwo.position].visible = false
                }, 700)
              }

              this.userSelection.length = 0
            }
          },
          { deep: true }
      )
    }
  },
  watch: {
    remainingCards: {
      handler() {
        if(this.remainingCards===1){
          if(this.var===0){
            launchConfetti()
          }
          else{
            this.var=0
          }
        }
      },
      deep: true
    },
  }
}
</script>
<style>
html,
h1 {
  margin-top: 0;
}
main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*height: 100vh;*/
  color: #fff;
  padding: 0;
  padding-top: 4rem;
  margin: 0;
  display:flex;
  flex-direction: column;
}
.description {
  font-family: 'Titillium Web', sans-serif;
}

.description p:last-child {
  margin-bottom: 2rem;
}
.memoryButton {
  background-color: var(--dark-alt);
  color: var(--light);
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-weight: bold;
  font-family: 'Titillium Web', sans-serif;
  border: 0;
  border-radius: 0.8rem;
}
.button img {
  padding-right: 0.5rem;
}
.game-board {
  display: grid;
  grid-template-columns: repeat(4, 7rem);
  grid-template-rows: repeat(4, 7rem);
  grid-column-gap: 1.5rem;
  grid-row-gap: 1.5rem;
  justify-content: center;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.title {
  padding-bottom: 2rem;
}
.shuffle-card-move {
  transition: transform 0.8s ease-in;
}
@media (max-width: 660px) {
  .game-board{
    grid-template-columns: repeat(4, 5rem);
    grid-template-rows: repeat(4, 5rem);
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.5rem;
  }
  @media (max-width: 490px) {
    .game-board{
      grid-template-columns: repeat(3, 4rem);
      grid-template-rows: repeat(6, 4rem);
    }
  }

}

</style>
