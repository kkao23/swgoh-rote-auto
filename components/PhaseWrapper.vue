<script setup lang="ts">

defineProps({
    phaseNumber: String,
    dsComponent: Object,
    lsComponent: Object,
    mixedComponent: Object,
    specialComponent: Object,
    lsPlanetName: String,
    dsPlanetName: String,
    mixedPlanetName: String,
});

const handleToggleExpanded = (expanded: boolean) => {
    isExpanded.value = expanded;
};
const isExpanded = ref(false);
</script>
<template>
    <table class="w-full text-yellow-400 text-sm md:text-lg lg:text-xl">
        <tbody>
            <tr>
                <td style="vertical-align: top;">
                    <table v-if="dsComponent">
                        <tbody class="divide-y divide-gray-200">
                            <tr>
                                <th class="text-red-400">Dark Side<br v-if="dsPlanetName"><span v-if="dsPlanetName" class="text-xs md:text-md lg:text-lg">({{ dsPlanetName }})</span></th>
                            </tr>
                            <component :is="dsComponent" />
                        </tbody>
                    </table>
                </td>
                <td style="vertical-align: top;">
                    <table v-if="mixedComponent">
                        <tbody class="divide-y divide-gray-200">
                            <tr>
                                <th class="text-purple-300">Mixed<br v-if="mixedPlanetName"><span v-if="mixedPlanetName" class="text-xs md:text-md lg:text-lg">({{ mixedPlanetName }})</span></th>
                            </tr>
                            <component :is="mixedComponent" />
                        </tbody>
                    </table>
                </td>
                <td style="vertical-align: top;">
                    <table v-if="lsComponent">
                        <tbody class="divide-y divide-gray-200">
                            <tr>
                                <th class="text-blue-200">Light Side<br v-if="lsPlanetName"><span v-if="lsPlanetName" class="text-xs md:text-md lg:text-lg">({{ lsPlanetName }})</span></th>
                            </tr>
                            <component :is="lsComponent" />
                        </tbody>
                    </table>
                </td>
                <td style="vertical-align: top;">
                    <table v-if="specialComponent">
                        <tbody class="divide-y divide-gray-200">
                            <tr>
                                <th>All</th>
                            </tr>
                            <component :is="specialComponent" />
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</template>