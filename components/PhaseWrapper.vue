<script setup lang="ts">

defineProps({
    phaseNumber: String,
    dsComponent: Object,
    lsComponent: Object,
    mixedComponent: Object,
    specialComponent: Object,
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
                                <th>Dark Side</th>
                            </tr>
                            <component :is="dsComponent" />
                        </tbody>
                    </table>
                </td>
                <td style="vertical-align: top;">
                    <table v-if="mixedComponent">
                        <tbody class="divide-y divide-gray-200">
                            <tr>
                                <th>Mixed</th>
                            </tr>
                            <component :is="mixedComponent" />
                        </tbody>
                    </table>
                </td>
                <td style="vertical-align: top;">
                    <table v-if="lsComponent">
                        <tbody class="divide-y divide-gray-200">
                            <tr>
                                <th>Light Side</th>
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