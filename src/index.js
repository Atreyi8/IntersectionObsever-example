import "./styles.css";
//https://www.youtube.com/watch?v=2IbRtjez6ag
const cards = document.querySelectorAll(".card");
//new intersectionobserver(callback,options)
//options = {threshold,rootmargin,root}
//threshold - what percentage of observed element should be on screen , 1 => 100%
// rootMargin - 25px , before 25px of observed element - add new cards or load or callback

const observer = new IntersectionObserver(
  (entries) => {
    console.log(entries);
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
    });
  },
  {
    threshold: 1
  }
);

const lastCardObserver = new IntersectionObserver(
  (entries) => {
    const lastCard = entries[0];
    if (!lastCard.isIntersecting) return;
    loadNewCards();
    //unobserve the last card
    lastCardObserver.unobserve(lastCard.target);
    //observe the brand new added last card
    lastCardObserver.observe(document.querySelector(".card:last-child"));
  },
  {
    rootMargin: "25px"
  }
);

lastCardObserver.observe(document.querySelector(".card:last-child"));

const cardContainer = document.querySelector(".card-container");

const loadNewCards = () => {
  for (let i = 0; i < 5; i++) {
    const card = document.createElement("div");
    card.textContent = "New Card";
    card.classList.add("card");
    observer.observe(card);
    cardContainer.append(card);
  }
};

cards.forEach((card) => {
  observer.observe(card);
});
