import {computed, ref} from "vue";
import _ from "lodash";

const newPlayer= ref(true)




export default function createGame(deck){
    const startGame= () =>{
        newPlayer.value=false
        restartGame()
    }

    const restartGame= () =>{
        deck.value=_.shuffle(deck.value)
        deck.value=deck.value.map((card, index) => {return{
            ...card,
            matched: false,
            position:index,
            visible: false
        }})
    }
    const status = computed(() => {
        if(matchesFound.value===0){
            return 'player wins'
        }else{
            return `matched found: ${matchesFound.value}`
        }
    })
    const matchesFound= computed(()=>{
        const matchedCards=deck.value.filter(card => card.matched===true).length
        return matchedCards/2
    })
    return{
        newPlayer,
        startGame,
        restartGame,
        matchesFound,
        status
    }

}