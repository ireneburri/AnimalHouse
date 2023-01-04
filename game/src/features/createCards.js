import axios from "axios";
export default async function createCards(){
    await axios.get('https://zoo-animal-api.herokuapp.com/animals/rand/8')
        .then((response)=>{
            let imgArray=[]
            response.data.forEach(animal=>{
                imgArray.push(animal.image_link)
            })
            return imgArray
        })
}