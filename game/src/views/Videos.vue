<template>

  <main style="padding-left: 6rem">
    <div class="header">

      <div class="container scrollMenu">
        <button @click="setFirst(0)" :disabled="isDisabled(0)" class="animaLink">elephant</button>
        <button @click="setDogs(1)" :disabled="isDisabled(1)" class="animaLink">dog</button>
        <button @click="setCats(2)" :disabled="isDisabled(2)" class="animaLink">cat</button>
        <button @click="setBirds(3)" :disabled="isDisabled(3)" class="animaLink">bird</button>
        <button @click="setSeals(4)" :disabled="isDisabled(4)" class="animaLink">seal</button>
        <button @click="setBunny(5)" :disabled="isDisabled(5)" class="animaLink">bunny</button>
        <button @click="setGoose(6)" :disabled="isDisabled(6)" class="animaLink">goose</button>
        <button @click="setHorse(7)" :disabled="isDisabled(7)" class="animaLink">horse</button>
        <button @click="setBear(8)" :disabled="isDisabled(8)" class="animaLink">bear</button>
        <button @click="setSquirrel(9)" :disabled="isDisabled(9)" class="animaLink">squirrel</button>
        <button @click="setFox(10)" :disabled="isDisabled(10)" class="animaLink">fox</button>
        <button @click="setOrangutan(11)" :disabled="isDisabled(11)" class="animaLink">Orangutan</button>
        <button @click="setCrocodile(12)" :disabled="isDisabled(12)" class="animaLink">Crocodile</button>
        <button @click="setTurtle(13)" :disabled="isDisabled(13)" class="animaLink">Turtle</button>
        <button @click="setPufferFish(14)" :disabled="isDisabled(14)" class="animaLink">puffer fish</button>
        <button @click="setDolphin(15)" :disabled="isDisabled(15)" class="animaLink">dolphin</button>
      </div>

      <div class="row" style="  background-color: var(--dark); width: 100%; margin:0 auto" v-if="isVisible">
        <div class="col-md-6">
          <div class="container ytContainer">
            <iframe class="yt" sameSite="Strict" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen v-if="isVisible" v-bind:src="video"  />
          </div>
        </div>
        <div class="col-md-6 curiosityContainer">
          <p>Did you know that..</p>
          {{curiosity}}
        </div>
      </div>

    </div>
  </main>

</template>

<script>

export default{
  name: 'vueVideos',
  data(){
    return{
      video:'',
      isVisible:false,
      selectedVideo:null,
      curiosity:''
    }
  },
  methods: {
    isDisabled(n_video){
      //console.log("(isDisabled) n_video= ", n_video)
      //console.log("(isDisabled) this.selectedVideo= ", this.selectedVideo)
       return n_video === this.selectedVideo;
    },
    setFirst(n_video){
      this.selectedVideo=n_video
      this.isVisible=true
      this.video='https://www.youtube.com/embed/jNQXAC9IVRw'
      this.curiosity='"Me at the zoo" is the first video uploaded to YouTube, on April 23, 2005, 8:31:52 p.m. PDT, or April 24, 2005, at 03:31:52 UTC. The 19-second video features YouTube\'s co-founder Jawed Karim, who was 25 years old at the time, in front of two elephants at the San Diego Zoo in California, noting their long trunks. Using Karim\'s camera, it was recorded by his high school friend, Yakov Lapitsky, a University of Delaware PhD student at the time, who was in San Diego to deliver his research to the American Chemical Society.'
    },
    setDogs(n_video){
      this.selectedVideo=n_video
      this.isVisible=true
      //console.log("(setDogs) n_video= ", n_video)
      //console.log("(setDogs) this.selectedVideo= ", this.selectedVideo)
      this.video='https://www.youtube.com/embed/zznDuS5qabM'
      this.curiosity='three dogs survived the sinking of the Titanic? Vetstreet states that the dogs were in first class and included a Pomeranian puppy - which her owner wrapped in a blanket to escape with, and everyone thought she was carrying a baby. Another Pomeranian and a Pekingese were also rescued. Move over Rose and Jack!'
    },
    setCats(n_video){
      this.selectedVideo=n_video
      this.isVisible=true
      this.video='https://www.youtube.com/embed/LMQ5Gauy17k'
      this.curiosity='In Holland’s embassy in Moscow, Russia, the staff noticed that the two Siamese cats kept meowing and clawing at the walls of the building. Their owners finally investigated, thinking they would find mice. Instead, they discovered microphones hidden by Russian spies. The cats heard the microphones when they turned on. Instead of alerting the Russians that they found said microphones, they simply staged conversations about delays in work orders and suddenly problems were fixed much quicker! '
    },
    setBirds(n_video){
      this.selectedVideo=n_video
      this.isVisible=true
      this.video='https://www.youtube.com/embed/6A-FSaWCcto'
      this.curiosity='Birds evolved from a group of dinosaurs called Theropods. This group is the same one that the famous Tyrannosaurus rex belonged to. '
    },
    setSeals(n_video){
      this.selectedVideo=n_video
      this.isVisible=true
      this.video='https://www.youtube.com/embed/VlTo9Z94XQ0'
      this.curiosity='Seals use clicking or trilling noises to communicate! All kinds of seals communicate vocally by making noise with their throat and air. The range, pitch, and variety of these noises, however, are all vast. Arctic seals can groan, chug, or growl in the course of their communication. Weddell seals send out long, low whistles underwater at very high decibel levels, and harbor seals make quiet calls. The variation of these methods shows the highly specified development of each species of seal in response to its environment. Each style of communication suits a particular need.'
    },
    setBunny(n_video){
      this.selectedVideo=n_video
      this.isVisible=true
      this.video='https://www.youtube.com/embed/c-JMDOLhiTE'
      this.curiosity='Rabbits need large cages or exercise pens kept indoors for health, safety and socialization purposes! And, they need plenty of daily supervised time outside of their cages or pens to play and exercise. Be sure to bunny-proof your home and do not leave them unattended during this time. '
    },
    setGoose(n_video){
      this.selectedVideo=n_video
      this.isVisible=true
      this.video='https://www.youtube.com/embed/RG0hldzPnac'
      this.curiosity='Exist a game where the player control a goose who bothers the inhabitants of an English village. The player must use the goose\'s abilities to manipulate objects and non-player characters to complete objectives. It\'s called Untitle Goose Game'
    },
    setHorse(n_video){
      this.selectedVideo=n_video
      this.isVisible=true
      this.video='https://www.youtube.com/embed/NzsGw1vA4Yo'
      this.curiosity='There were no horses in Australia until 1788, when they arrived with with the first Western settlers, and were used for farming and utility work. Only the strongest and fittest horses survived the hard sea journey over from Europe and Australian horses still maintain a reputation for being amongst the hardiest equines in the world.'
    },
    setBear(n_video){
      this.selectedVideo=n_video
      this.isVisible=true
      this.video='https://www.youtube.com/embed/mlxdnyfkWKQ'
      this.curiosity='Bears are extraordinarily intelligent animals. They have far superior navigation skills to humans; excellent memories; large brain to body ratio; and use tools in various contexts from play to hunting.'
    },
    setSquirrel(n_video){
      this.selectedVideo=n_video
      this.isVisible=true
      this.video='https://www.youtube.com/embed/rGfWMaZJR0I'
      this.curiosity='In the 2005 remake of “Charlie And, The Chocolate Factory” squirrels were real. For the squirrel scene, the squirrels were not CGI, but were actually real life and were professionally trained by The Nut Room Animal trainer Michael Alexander and his team who spent 19 weeks training these squirrels for this one scene.'
    },
    setFox(n_video){
      this.selectedVideo=n_video
      this.isVisible=true
      this.video='https://www.youtube.com/embed/46JgvsaL2wE'
      this.curiosity='Foxes make use of the earth’s magnetic field to hunt. Researchers have found that foxes are the first animals in the world to use the earth’s magnetic fields to judge the distance and direction of their prey. They can use this to their advantage when hunting for small animals located in high grass.'
    },
    setOrangutan(n_video){
      this.selectedVideo=n_video
      this.isVisible=true
      this.video='https://www.youtube.com/embed/Xf32ggObtjM'
      this.curiosity='Sadly, orangutans are today on the endangered species list. Deforestation in the forests where they live has reduced their habitat, and illegal hunting has put populations at serious risk.'
    },
    setCrocodile(n_video){
      this.selectedVideo=n_video
      this.isVisible=true
      this.video='https://www.youtube.com/embed/oWGS2dX-7aI'
      this.curiosity='Crocodiles are one of the only animals that are thought to have survived the asteroid that wiped out the dinosaur population. They survived the mass extinction and thrived for hundreds of millions of years to come. Therefore, it’s safe to say, their history on earth is a long and mysterious one! '
    },
    setTurtle(n_video){
      this.selectedVideo=n_video
      this.isVisible=true
      this.video='https://www.youtube.com/embed/x7CLLvSnezk'
      this.curiosity='As reptiles, sea turtles breathe air, but they have the ability, under natural conditions, to remain submerged for hours at a time. They even sleep underwater. Most sea turtles spend their entire life at sea, only returning to nesting beaches to lay eggs.'
    },
    setPufferFish(n_video){
      this.selectedVideo=n_video
      this.isVisible=true
      this.video='https://www.youtube.com/embed/hwNzlUQhcJI'
      this.curiosity='Pufferfish can inflate into a ball shape to evade predators. Also known as blowfish, these clumsy swimmers fill their elastic stomachs with huge amounts of water (and sometimes air) and blow themselves up to several times their normal size. Some pufferfish species also have spines on their skin to ward off predators.'
    },
    setDolphin(n_video){
      this.selectedVideo=n_video
      this.isVisible=true
      this.video='https://www.youtube.com/embed/x9v7j5Dse_Y'
      this.curiosity='Bottlenose dolphins are one of the few species, along with apes and humans, that have the ability to recognise themselves in a mirror. This is considered \'reflective\' of their intelligence. Dolphins are also among the few animals that have been documented using tools.'
    }
  },
}

</script>

<style lang="scss" scoped>
.scrollMenu {
  margin: 0 auto;
  display:flex;
  justify-content: space-evenly;
  border-radius: 1rem;
  border: 1px solid var(--dark);
  overflow: auto;
  white-space: nowrap;
  padding:0.1rem;
  background-color: var(--dark);
  margin-bottom: 2rem;
  width: 100%;
}

.scrollMenu a:hover {
  background-color: #777;
}
.animaLink{
  background-color: var(--light);
  padding: 0.2rem;
  border-radius: 1rem;
  color:var(--dark);
  &:hover {
    background-color: var(--dark-alt);
    color: var(--light)
  }
}
.ytContainer{
  //width: 70%;
  //padding-bottom: 40%;
  width: 100%;
  padding-bottom: 56.25%;
  position: relative;
  margin: 1rem;
  .yt{
    position:absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    border:3px solid var(--dark-alt)
  }
}
.curiosityContainer{
  color:var(--light);
  margin: auto;
  padding: 3rem;
}
@media (max-width: 768px) {
  .scrollMenu{
    justify-content:flex-start;
    border-radius: 0rem ;
  }
  .animaLink{
    margin: 0.3rem
  }
  .ytContainer{
    margin: 1rem 0
  }
}
</style>