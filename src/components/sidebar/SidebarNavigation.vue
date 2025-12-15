<script setup>
import IconNavDashboard from '../../components/icons/sidebar/IconNavDashboard.vue'
import IconNavTeam from '../../components/icons/sidebar/IconNavTeam.vue'
import IconNavProjects from '../../components/icons/sidebar/IconNavProjects.vue'
import IconNavCalendar from '../../components/icons/sidebar/IconNavCalendar.vue'
import IconNavDocuments from '../../components/icons/sidebar/IconNavDocuments.vue'
import IconNavReports from '../../components/icons/sidebar/IconNavReports.vue'
import IconCardDesign from '../../components/icons/sidebar/IconCardDesign.vue'
import IconCardEngineering from '../../components/icons/sidebar/IconCardEngineering.vue'
import IconYearToDate from '../../components/icons/sidebar/IconYearToDate.vue'
</script>

<template>
  <!-- Main -->
  <p class="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
    Main
  </p>

  <ul class="space-y-1">
    <li class="sidebar-item">
      <IconNavDashboard /> Dashboard
    </li>
    <li class="sidebar-item">
      <IconNavTeam /> Team
    </li>
    <li class="sidebar-item">
      <IconNavProjects /> Projects
    </li>
    <li class="sidebar-item">
      <IconNavCalendar /> Calendar
    </li>
    <li class="sidebar-item">
      <IconNavDocuments /> Documents
    </li>
    <li class="sidebar-item">
      <IconNavReports /> Reports
    </li>
  </ul>

  <hr class="mt-4" />

  <!-- Teams -->
  <div class="mt-8">
    <p class="sidebar-section">Your teams</p>
    <ul class="space-y-1">
      <li class="sidebar-item">
        <IconCardDesign /> Design
      </li>
      <li class="sidebar-item">
        <IconCardEngineering /> Engineering
      </li>
    </ul>
  </div>

  <hr class="mt-4" />

  <!-- Reports -->
  <div class="mt-8">
    <p class="sidebar-section">Reports</p>
    <ul class="space-y-1">
      <li class="sidebar-item">
        <IconYearToDate /> Month to Date
      </li>
      <li class="sidebar-item">
        <IconYearToDate /> Year to Date
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar-item {
  @apply flex items-center gap-3 rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-50;
}
.sidebar-section {
  @apply mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-slate-400;
}
</style>
