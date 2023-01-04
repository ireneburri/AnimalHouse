<template>
  <main>
  <transition-group tag="section" class="game-board container" name="shuffle-card">
    <Card
        v-for="card in cardList"
        :key="`${card.value}-${card.variant}`"
        :matched="card.matched"
        :value="card.value"
        :visible="card.visible"
        :position="card.position"
        @select-card="flipCard"
    />
  </transition-group>
  <button v-if="newPlayer" @click="startGame" class="memoryButton">
    <img src="/images/play.svg" alt="Restart Icon" /> Start Game
  </button>
  <button v-else @click="restartGame" class="memoryButton">
    <img src="/images/restart.svg" alt="Restart Icon" /> Restart Game
  </button>
  </main>
</template>

<script>
import _ from 'lodash'
import {computed, ref, watch} from 'vue'
import { launchConfetti } from '../utilities/confetti'
import Card from '../components/Card'
import createCards from "@/features/createCards";

export default {
  name: 'App',
  components: {
    Card
  },
  setup() {
    const cardList = ref([])
    const userSelection = ref([])
    const newPlayer = ref(true)

    const startGame = () => {
      newPlayer.value = false

      restartGame()
    }

    const status = computed(() => {
      if (remainingPairs.value === 0) {
        return 'Player wins!'
      } else {
        return `Remaining Pairs: ${remainingPairs.value}`
      }
    })

    const remainingPairs = computed(() => {
      const remainingCards = cardList.value.filter(
          card => card.matched === false
      ).length

      return remainingCards / 2
    })

    const restartGame = () => {
      cardList.value = _.shuffle(cardList.value)

      cardList.value = cardList.value.map((card, index) => {
        return {
          ...card,
          matched: false,
          position: index,
          visible: false
        }
      })
    }
    const cardItems = [
      'bat',
      'candy',
      'cauldron',
      'cupcake',
      'ghost',
      'moon',
      'pumpkin',
      'witch-hat'
    ]
       const cardItem= createCards()
    console.log(cardItem.value)

    cardItems.forEach(item => {
      cardList.value.push({
        value: item,
        variant: 1,
        visible: false,
        position: null,
        matched: false
      })

      cardList.value.push({
        value: item,
        variant: 2,
        visible: true,
        position: null,
        matched: false
      })
    })

    cardList.value = cardList.value.map((card, index) => {
      return {
        ...card,
        position: index
      }
    })

    const flipCard = payload => {
      cardList.value[payload.position].visible = true

      if (userSelection.value[0]) {
        if (
            userSelection.value[0].position === payload.position &&
            userSelection.value[0].faceValue === payload.faceValue
        ) {
          return
        } else {
          userSelection.value[1] = payload
        }
      } else {
        userSelection.value[0] = payload
      }
    }

    watch(remainingPairs, currentValue => {
      if (currentValue === 0) {
        launchConfetti()
      }
    })

    watch(
        userSelection,
        currentValue => {
          if (currentValue.length === 2) {
            const cardOne = currentValue[0]
            const cardTwo = currentValue[1]

            if (cardOne.faceValue === cardTwo.faceValue) {
              cardList.value[cardOne.position].matched = true
              cardList.value[cardTwo.position].matched = true
            } else {
              setTimeout(() => {
                cardList.value[cardOne.position].visible = false
                cardList.value[cardTwo.position].visible = false
              }, 700)
            }

            userSelection.value.length = 0
          }
        },
        { deep: true }
    )

    return {
      cardList,
      flipCard,
      userSelection,
      status,
      restartGame,
      startGame,
      newPlayer
    }
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

.description p {
  margin: 0;
  font-size: 1.2rem;
}

.description p:last-child {
  margin-bottom: 2rem;
}

.memoryButton {
  background-color: orange;
  color: white;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-weight: bold;
  font-family: 'Titillium Web', sans-serif;
  font-size: 1.1rem;
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

@media (max-width: 1024px) {
  .game-board{
    grid-template-columns: repeat(4, 3.2rem);
    grid-template-rows: repeat(4, 3.2rem);
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.5rem;
  }
}
</style>