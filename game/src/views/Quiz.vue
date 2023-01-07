<template>
  <main class="container quizPage">
    <h1 class="pageTitle">AnimalQuiz</h1>
    <div v-if="!isHidden" class="container startQuiz">

      <div class="container startContainer">
        <p>Test your animal knowledge with this tricky true or false quiz!</p>
        <p v-if="!user">Attention! Since you are not logged in, your score will not be saved.</p>
        <button @click="toggle" class="buttonStart">start</button>
      </div>
    </div>

    <div v-if="isHidden" class="row questionContainer">

      <img :src="imgUrl" class=" col-xl-6">
      <div class="col-xl-6">
        <p>{{question}}</p>
        <div class="optionsContainer" style="margin-bottom:1rem">
          <button :disabled="isDisabled" :class="vero" @click="answeredTrue" type="button" class="optionButton">true</button>
          <button :disabled="isDisabled" :class="falso" @click="answeredFalse" class="optionButton">false</button>
        </div>
        <button v-if="answered" class="next" @click="nextAnimal">next</button>
      </div>

      <div v-if="OpenClose" class="modal fade show" style="display:block" tabindex="-1" aria-labelledby="wrongAnswer" aria-modal="true" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content" style="color: var(--dark); background-color: var(--light)">
            <div class="modal-header">
              <h5 class="modal-title">Whoops!</h5>
              <button type="button" class="btn-close" @click="OpenCloseFun" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Wrong answer.. This is your score: {{score}}</p>
              <p v-if="user">Go see your result in the leaderboard</p>
              <p v-else>This score will not be saved because you are not logged in</p>
            </div>
            <div class="modal-footer">
              <button v-if="user" type="button"  @click="$router.push('/')" :class="'btn btn-primary'">LeaderBoard</button>
              <button v-else type="button"  @click="$router.push('/login')" :class="'btn btn-primary'">login</button>
              <button type="button"  @click="OpenCloseFun_Toggle" :class="'btn btn-success'">Close</button>

            </div>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<script>
import axios from "axios";
import createQuestion from "@/features/createQuestion";
import {mapGetters} from "vuex";
export default{
  name: 'vueQuiz',
  data(){
    return {

      //toggle startButton and question
      isHidden:false,
      twoAnimals:'',
      imgUrl:'',
      answer:'',
      question:'',
      animal:'',
      isDisabled:false,
      score:0,
      vero:'',
      falso:'',

      //if the user answered correctly
      answered:null,

      //open/close the modal
      OpenClose:false
    }
  },
  methods:{
    async setQuestion(){
      //api request of two animal from
      this.twoAnimals=await axios.get('https://site212224.tw.cs.unibo.it/quiz/size/2')
          .then((response)=>{
            const animalOne = response.data[0]
            const animalTwo = response.data[1]
            console.log(response)
            return{
              animalOne,
              animalTwo
            }
          }).catch(error=>{
            return console.log(error)
          })

      //set the img
      this.imgUrl=this.twoAnimals.animalOne.img

      //set the question
      const par = Math.floor(Math.random() * 10)
      if ((this.twoAnimals.animalOne.id === this.twoAnimals.animalTwo.id) || (Math.floor(Math.random() * 2) % 2 === 0)) {
        this.animal= this.twoAnimals.animalOne
      }else{
        this.animal= this.twoAnimals.animalTwo
      }

      //create the question
      [this.question, this.answer]=createQuestion(this.twoAnimals.animalOne, this.animal, par)
      console.log('question: ',this.question)
      console.log('answer', this.answer)
    },
    toggle(){
      if(this.isHidden === false) {
        this.isHidden=true
        this.setQuestion()
      }
      else {
        this.isHidden=false
      }
      if(this.answered===false) {
        this.answered = null
        this.isDisabled = false
        this.vero = ""
        this.falso = ""
        this.score = 0
        this.setQuestion()
      }

    },
    answeredTrue(){
      if(this.answer===true){
        this.vero='correct'
        this.answered=true
        this.score=this.score+1
      }
      if(this.answer===false){
        this.vero='incorrect'
        this.answered=false
        this.OpenCloseFun()
      }
      console.log(this.vero)
      this.isDisabled=true
      console.log(this.score)
    },
    answeredFalse(){
      if(this.answer===false){
        this.falso='correct'
        this.answered=true
        this.score=this.score+1
      }
      if(this.answer===true){
        this.falso='incorrect'
        this.answered=false
        this.OpenCloseFun()
      }
      console.log(this.falso)
      this.isDisabled=true
    },
    nextAnimal(){
      this.answered=null
      this.isDisabled=false
      this.correctAnswer=null
      this.vero=""
      this.falso=""
      this.setQuestion()
    },
    async OpenCloseFun(){

      if(this.user && this.user.score<this.score){
        console.log('ao:', this.user.username)
        console.log(this.score)
        await axios.patch(`https://site212224.tw.cs.unibo.it/user/username/${this.user.username}`,{
          score:this.score
        })
      }

      console.log('user id: ', this.user)
      this.OpenClose=!this.OpenClose;
    },
    OpenCloseFun_Toggle(){
      this.toggle()
      this.OpenCloseFun();
    },
    login(){
      this.$router.push('/login')
    }
  },
  computed:{
    ...mapGetters(['user'])
  },
}
</script>

<style lang="scss">
.quizPage{
  color: black;
  font-size: 150%;
}
.startQuiz{
  margin: 0 auto;
  text-align:center;
  h1{
    padding-bottom: 40px;
  }
}
.startContainer{
  width: 70%;
  height: 90%;
  margin: auto auto;
  background-color: var(--dark-alt);
  border-radius: 20px;
  padding:40px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  color: white;
}
.next{
  background-color: white;
  border: none;
  color: var(--dark-alt);
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline;
  font-size: 125%;
  width:40%;
  border-radius: 20px;
  position:relative;
  margin-top:2rem
}
.buttonStart{
  background-color: white;
  border: none;
  color: var(--dark-alt);
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline;
  font-size: 125%;
  width:40%;
  border-radius: 20px;
  margin: 0 auto;
}
.optionButton{
  background-color: white;
  border: none;
  color: var(--dark-alt);
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline;
  font-size: 125%;
  width:40%;
  border-radius: 20px;
  margin: 0 auto;
}
.optionsContainer{
  display: flex;
  justify-content: space-evenly;
}
.questionContainer{
  color:white;
  background-color: var(--dark-alt);
  border-radius: 20px;
  .correct{
    background-color: green;
    border:1px solid var(--primary) !important;
    font-weight:bold;
    color:white
  }
  .incorrect {
    border: 1px solid var(--primary) !important;
    font-weight: bold;
    color: white;
    background-color: red;
  }
  img{
    max-height:25rem;
    object-fit: contain;
    margin-bottom:10px;
    padding:1rem
  }
}
@media (max-width: 768px) {
  .startContainer{
    width: 100%;
  }
  .questionContainer{
    width: 100%;
  }
  .buttonStart{
    width: 70%;
  }
  .optionButton{
    width: 70%;
  }
}
</style>