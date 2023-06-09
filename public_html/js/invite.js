// import { gsap } from "../../node_modules/gsap";

// window.onload = function () {
//   var closedEnvelope = document.getElementById("closedEnvelope");
//   var openEnvelope = document.getElementById("openEnvelope");
//   var letter = document.getElementById("letter");

//   // Set initial state
//   gsap.set(openEnvelope, { opacity: 0 });
//   gsap.set(letter, { opacity: 0, scaleY: 0 });

//   // Create the animation timeline
//   var timeline = gsap.timeline();

//   // Animate the opening of the envelope
//   timeline.to(closedEnvelope, { opacity: 0, duration: 1 }, "+=0.5");
//   timeline.to(openEnvelope, { opacity: 1, duration: 1 });

//   // Animate the unrolling of the letter
//   timeline.to(letter, { opacity: 1, scaleY: 1, duration: 1 });
// };
import { db } from "../../firebase.js";

function generatePersonalizedInvite(userId) {
  // Fetch user data
  db.ref("/users/" + userId)
    .once("value")
    .then(function (snapshot) {
      document.getElementById("invitation-container").innerHTML = ejs.render(
        "views/invite.ejs",
        { user: snapshot.val() }
      );
    });
}
