<script setup lang="ts">
import { ref, computed } from 'vue'

// Change this to match your current background image
const imageUrl = '/images/map_view/mustafar.png'
const viewBox = '0 0 1362 802' // Match your real viewBox

const points = ref<string[]>([])
const history = ref<string[]>([]) // For undo functionality

// Get coordinates relative to the SVG, not the screen
function addPoint(event: MouseEvent) {
  const svg = event.currentTarget as SVGSVGElement
  const pt = svg.createSVGPoint()
  
  pt.x = event.clientX
  pt.y = event.clientY
  
  // Transform screen pixel to SVG coordinate space
  const cursorPoint = pt.matrixTransform(svg.getScreenCTM()!.inverse())
  
  // Round to integer to keep string short
  const x = Math.round(cursorPoint.x)
  const y = Math.round(cursorPoint.y)
  
  const coord = `${x},${y}`
  points.value.push(coord)
}

function undo() {
  points.value.pop()
}

function clear() {
  points.value = []
}

// Generates the string you need for your config
const finalString = computed(() => points.value.join(' '))
</script>

<template>
  <div class="p-4 bg-gray-900 min-h-screen text-white">
    <div class="fixed top-4 right-4 bg-gray-800 p-4 rounded shadow-xl z-50 w-64">
      <h3 class="font-bold mb-2">Coordinate Extractor</h3>
      <div class="flex gap-2 mb-2">
        <button @click="undo" class="bg-yellow-600 px-2 py-1 rounded text-sm">Undo</button>
        <button @click="clear" class="bg-red-600 px-2 py-1 rounded text-sm">Clear</button>
      </div>
      <div class="bg-black p-2 rounded text-xs break-all font-mono select-all">
        {{ finalString || 'Click map to start...' }}
      </div>
      <p class="text-xs text-gray-400 mt-2">
        Click corners of the shape. Copy the string above into your config.
      </p>
    </div>

    <div class="relative w-full max-w-4xl mx-auto border-2 border-green-500">
      <img :src="imageUrl" class="w-full h-auto opacity-50" />
      
      <svg 
        class="absolute inset-0 w-full h-full cursor-crosshair"
        :viewBox="viewBox"
        preserveAspectRatio="none"
        @click="addPoint"
      >
        <polygon 
          :points="finalString" 
          fill="rgba(0, 255, 0, 0.3)" 
          stroke="#00ff00" 
          stroke-width="2"
          vector-effect="non-scaling-stroke"
        />
        <circle 
          v-for="(p, i) in points" 
          :key="i"
          :cx="p.split(',')[0]" 
          :cy="p.split(',')[1]" 
          r="4" 
          fill="red" 
        />
      </svg>
    </div>
  </div>
</template>