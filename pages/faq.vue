<script setup lang="ts">
const items = [{
  label: 'What is this?',
  content: 'This site is meant to be an easy reference guide to help you maximize the number of waves you get in Rise of the Empire territory battle, using the least amount of time. I\'ve focused on battles that can be done on full or guided auto battle, but for completeness sake I\'ve also included some battles that can only be done on manual.'
}, {
  label: 'Why don\'t you have X team on here?',
  content: 'I try to include every team I can but I don\'t have every team in the game geared or omicron\'d. If you\'d like to suggest a team feel free to do so here.'
}, {
  label: 'X team didn\'t work at all',
  content: 'Feel free to let me know here. Did you have decent mods on the team, and followed the team comp, as well as any omicrons I listed, if any?'
}, {
  label: 'Do mods matter?',
  content: 'Sort of. You need your teams to have decent mods. Elite mods aren\'t necessary. As opposed to the PvE modes, survivability tends to be more important in TB than raw speed. In addition, omicron and Galactic Legend teams are less mod dependent than other teams.'
}, {
  label: 'I love this page, how can I support you?',
  content: 'Thanks! Help with AWS hosting costs here'
}, {
  label: 'This page sucks',
  content: 'Not really a question, but that\'s too bad to hear. Feel free to send suggestions for improvement here.'
},
{
  label: 'What are good Territory Battle omicrons?',
  content: 'Big fan of Appo right now if you\'re already getting Dark Side Clones reliced for the raid.'+
            'Marrok is really good and can help auto several special missions.'+
            'Same with Depa (for Jedi Vanguard), and Wrecker for Bad Batch. Jedi Knight Cal Kestis can save you a bunch of time for the Special Mission but there isn\'t a lot of reason to relic him over 7 which limits his usefulness.'+
            'Enochs is decent if you have him reliced for Peridia Patrol, but its hard to find a team for him above R7.'
},
{
  label: 'What are bad Territory Battle omicrons?',
  content: 'Carth is pretty terrible. Anything that forces you to relic characters you wouldn\'t normally relic I wouldn\'t advise, like ROLO and Finn'
}]
</script>

<template>
  <UAccordion :items="items" class="m-4" />
</template>
