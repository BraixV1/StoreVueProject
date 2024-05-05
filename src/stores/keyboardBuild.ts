import type { stringOrNull } from "@/types/types";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export const useBuildStore = defineStore('build', () => {
    const buildId = ref<stringOrNull>(JSON.parse(localStorage.getItem('build.buildId') || 'null'));
    

    const isBuilding = computed<boolean>(() => !buildId.value)

    watch(
        [buildId], ([newBuildId]) => {
            localStorage.setItem('build.buildId', JSON.stringify(newBuildId))
        },
        { deep: true}
    )

    function updateBuildData(newBuildId: string){
        buildId.value = newBuildId || buildId.value;
    }

    function clearBuildData() {
        buildId.value = null;
        localStorage.setItems('build.buildId', null)
    }

    return {buildId, isBuilding, updateBuildData, clearBuildData}
})