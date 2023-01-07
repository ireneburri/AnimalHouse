<template>
  <main class="aboutPage">
          <h2 class="pageTitle">How to Stay Healthy Around Pets</h2>
    <nav class="container scrollMenu">
      <a href="#risk">Risk And Benefits</a>
      <a href="#disease">Deseases</a>
      <a href="rightPet">Pick The right Pet</a>
      <a href="#health">Pet Health</a>
      <a href="#hygiene">Hygiene</a>
      <a href="kids">Kids Around Pets</a>
      <a href="#home">Risk And Benefits</a>
      <a href="#contact">Deseases</a>
      <a href="#h">Pet Health</a>
    </nav>
    <div class="paragraph" id="risk">
          <h3>Understand the Risks and Benefits of Pets</h3>
          <div>There are many health benefits of owning a pet.
            They can increase opportunities to exercise, get outside, and socialize.
            Regular walking or playing with pets can decrease blood pressure, cholesterol levels, and triglyceride levels.
            Pets can help manage loneliness and depression by giving us companionship.
            Most households in the United States have at least one pet.
          </div>
          <p>Studies have shown that the bond between people and their pets is linked to several health benefits,
            including:</p>
          <ul>
            <li>Decreased blood pressure, cholesterol levels, triglyceride levels, feelings of loneliness, anxiety, and
              symptoms of PTSD.
            </li>
            <li>Increased opportunities for exercise and outdoor activities; better cognitive function in older adults; and
              more opportunities to socialize
            </li>
          </ul>
    </div>
    <div class="paragraph" id="disease">
          <h3>Some people are at higher risk for diseases animals can carry</h3>
          <div>Children younger than 5 years old, people with weakened immune systems, and people 65 years of age and older
            are more likely to get diseases spread between animals and people (also known as zoonotic diseases).
            Pregnant women are also at a higher risk for certain animal-related diseases.
            Before getting a new pet, keep the following in mind:
          </div>
          <ul>
            <li>Households with children younger than 5 years old should not have pet reptiles (turtles, lizards, snakes),
              amphibians (frogs, toads), or backyard poultry because of the risk of serious illness from harmful germs spread
              between these animals and young children.
            </li>
            <li>People with weakened immune systems should take extra precautions when choosing and handling pets.
              Talk to your veterinarian for help picking the best pet.
            </li>
            <li>Pregnant women should avoid adopting a new cat or handling stray cats, especially kittens.
              Cats can carry a parasite that causes toxoplasmosis—a disease that can cause birth defects.
              If you are pregnant, you do not need to give up your current cat, but you should avoid handling cat litter.
            </li>
            <li>Pregnant women should avoid contact with pet rodents to prevent exposure to lymphocytic choriomeningitis
              virus, which can cause birth defects.
              If you’re pregnant and have a pet rodent, avoid direct contact and have someone else clean its habitat.
            </li>
          </ul>
    </div>
    <div class="paragraph" id="rightPet">
      <h3>Pick the right pet</h3>
      <div>Before adopting a new pet, make sure that it is the right one for you and your family.
        Do some research beforehand about the specific needs of the animal.
        Ask yourself these questions before getting a pet:</div>
      <ul>
        <li>How long will this animal live?</li>
        <li>What does the pet eat?</li>
        <li>How much exercise does the pet need?</li>
        <li>How large will it become?</li>
        <li>How much will veterinary care cost?</li>
        <li>Do I have enough time to properly care for and clean up after the pet?</li>
        <li>What type of habitat does this pet need to be healthy?</li>
        <li>What type of exercise does this pet need?</li>
        <li>Are pets allowed in my house, apartment, or condominium?</li>
        <li>Are there young children, older people, or people with weak immune systems who will care for or be around the pet?</li>
      </ul>
    </div>
    <div class="paragraph" id="health">
          <h3>Keep Your Pet Healthy</h3>
          <div>
            Whether you have a dog, cat, horse, parakeet, gerbil, bearded dragon, or other fun pet, providing regular,
            life-long veterinary care is important for keeping your pet and family healthy.
            Regular veterinary visits are essential to good pet health.
            Talk to your pet’s veterinarian about how to keep your pet healthy.
            Provide your pet with a good diet, fresh water, clean bedding, and plenty of exercise.
            Keep up with your pet’s vaccines, deworming, and flea and tick control.
            Some pets can carry ticks that can spread serious diseases like Lyme disease and Rocky Mountain spotted fever to
            people.
            In areas with plague—including some rural areas in the western US—fleas can be a risk to both animals and their
            owners.
          </div>
          <p>By keeping your pet healthy, you help to keep yourself and your family healthy.
            Contact your veterinarian if you have any questions about your pet’s health or if you think your pet may be
            sick.</p>
    </div>
    <div class="paragraph" id="hygiene">
      <h3>Practice good hygiene</h3>
      <div>Washing your hands is one of the best ways to stay healthy around pets and can also protect you against other diseases.
        Always wash your hands after playing with, feeding, or cleaning up after your pet.
        Pets can contaminate surfaces in your home with germs—you don’t have to touch your pets to get sick from the germs they might be carrying.
        Keep your pets away from people food and areas where food and drink are prepared, served, consumed, or stored.
        Always clean up dog feces (poop) from your yard and public areas to prevent the spread of parasites and other germs to people.
        If you’re pregnant and have a cat, avoid changing the litter box.</div>
    </div>
    <div class="paragraph" id="kids">
      <h3>Supervise kids around pets</h3>
      <div>Always supervise young children around pets, even trusted family pets.
        Children, especially those 5 years of age and younger,
        can be at higher risk for pet-related illnesses because they often touch surfaces that may be contaminated,
        put objects in their mouths, and are less likely to wash their hands.
        Children are often the victims of bites and scratches and are more likely to get seriously ill from certain diseases spread from pets.
        Don’t let kids kiss pets or put their hands or objects in their mouths after playing with pets.
        Help them to wash their hands after they interact with any animal.</div>
    </div>
    <br/>
  </main>
</template>

<style lang="scss" scoped>
.aboutPage {
  text-align: left;
  color: var(--dark);
  margin:0 7rem;
  h3 {
  text-decoration: underline;
}
}
.pageTitle{
  margin: 2rem auto
}
nav {
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
  a{
    background-color: var(--light);
    padding: 0.2rem;
    border-radius: 1rem;
    color:var(--dark);
    text-decoration: none;
    &:hover {
      background-color: var(--dark-alt);
      color: var(--light)
    }
  }
}
@media (max-width: 1024px) {
  .pageTitle{
    font-size: 1.5rem;
  }
  .aboutPage{
    margin: 0 0
  }

}
</style>
<script>
export default {
  name: 'vueAbout'
}
</script>