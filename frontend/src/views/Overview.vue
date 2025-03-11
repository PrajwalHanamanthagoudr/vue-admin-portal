<template>
  <div style="background-color: #fafcfe;">
    <!-- App Bar -->
    <v-app-bar app elevate-on-scroll elevation="0" color="white" style="border-bottom: 1px solid gainsboro;">
      <v-container class="d-flex justify-space-between align-center">
        <h3>Overview</h3>
        <v-row class="d-flex align-center justify-end ga-2">
          <v-btn v-for="(btn, index) in buttons" :key="index" size="small" class="outlined-btn"
            :prepend-icon="btn.prependIcon" variant="outlined"
            @click="btn.text === 'Customize Widget' && openCustomizationDialog()">
            {{ btn.text }}
          </v-btn>
        </v-row>
      </v-container>
    </v-app-bar>

    <!-- Main Content -->
    <v-container>
      <v-row>
        <draggable v-model="cards" group="cards" tag="div" class="d-flex flex-wrap" style="width: 100%;">
          <template v-slot:item="{ element, index }">
            <v-col :key="index" cols="12" md="3">
              <v-card hover variant="flat" class="card-style">
                <v-card-text class="d-flex flex-column align-items-start">
                  <div class="text-subtitle-2 mb-2" style="color: #97a3b6;">{{ element.title }}</div>
                  <div class="text-h5 font-weight-bold">{{ element.value }}</div>
                  <div class="d-flex align-center" style="gap: 8px;">
                    <v-chip :color="element.perChange > 0 ? 'success' : 'error'" text-color="white"
                      style="width: 90px; height: 25px;" outlined>
                      {{ element.perChange > 0 ? '▲' : '▼' }} {{ element.perChange }}%
                    </v-chip>
                    <span class="comparison-text">Compared to last month</span>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </template>
        </draggable>
      </v-row>

      <!-- Additional Sections v-if="response" :data="response"-->
      <RevenueSection  />
      <SalesSection  />
    </v-container>

    <!-- Customization Dialog -->
    <v-dialog v-model="customizationDialog" max-width="1200px" height="500px">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="text-h5" style="color: #287F71; font-weight: bold;">Customize Widget</span>
          <v-btn color="#EB862A" @click="openCreateDialog">Create New Widget</v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="3" v-for="(card, index) in cards" :key="index">
                <v-card class="card-style">
                  <v-card-text class="d-flex flex-column align-items-start">
                    <div class="d-flex align-center justify-space-between">
                      <div class="text-subtitle-2 mb-2" style="color: #97a3b6;">{{ card.title }}</div>
                      <div class="d-flex ga-1" style="color: #97a3b6;">
                        <v-icon @click="openEditDialog(index)">mdi mdi-pencil-outline</v-icon>
                        <v-icon @click="deleteCard(index)">mdi mdi-delete-outline</v-icon>
                      </div>
                    </div>
                    <div class="text-h5 font-weight-bold">{{ card.value }}</div>
                    <div class="d-flex align-center" style="gap: 8px;">
                      <v-chip :color="card.perChange > 0 ? 'success' : 'error'" text-color="white"
                        style="width: 90px; height: 25px;" outlined>
                        {{ card.perChange > 0 ? '▲' : '▼' }} {{ card.perChange }}%
                      </v-chip>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="#EB862A" @click="customizationDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add/Edit Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5" style="color: #287F71; font-weight: bold;">{{ dialogMode === 'add' ? 'Add New Widget' :
            'Edit Widget' }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field label="Title" v-model="currentCard.title" required></v-text-field>
            <v-text-field label="Value" v-model="currentCard.value" type="number" required></v-text-field>
            <v-text-field label="Change (%)" v-model="currentCard.perChange" type="number" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="#97a3b6" @click="closeDialog">Cancel</v-btn>
          <v-btn text color="#EB862A" @click="saveCard">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.visible" :color="snackbar.color" elevation="24" timeout="3000" location="top left">
      {{ snackbar.message }}
      <template #actions>
        <v-btn text @click="snackbar.visible = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import RevenueSection from "./RevenueSection.vue";
import SalesSection from "./SalesSection.vue";
import axios from 'axios';

export default {
  components: {
    RevenueSection,
    SalesSection,
    draggable,
  },
  data() {
    return {
      buttons: [
        { text: "Customize Widget", prependIcon: "mdi-view-dashboard-outline" },
        { text: "Filter", prependIcon: "mdi-filter-variant" },
        { text: "Share", prependIcon: "mdi-share-variant-outline" },
      ],
      cards: [
        { title: "Total Income", value: "$32,499.93", perChange: 12.95 },
        { title: "Profit", value: "$10,499.93", perChange: -0.33 },
        { title: "Total Views", value: "5,211,832", perChange: 0.32 },
        { title: "Conversion Rate", value: "4.83%", perChange: 8.05 },
      ],
      // cards: [],
      customizationDialog: false,
      dialog: false,
      dialogMode: "add", // 'add' or 'edit'
      currentCard: {
        id: null,
        title: "",
        value: "",
        perChange: 0,
      },
      editIndex: null,
      snackbar: {
        visible: false,
        message: "",
        color: "#287F71",
      },
      response: null,
    };
  },
  mounted() {
    this.fetchCards();
  },
  methods: {
    async fetchCards() {
      try {
        const response = await axios.get('http://localhost:3000/api/cards');
        if (response) {
          this.response = response.data.results
        }
        // this.cards = response.data.results.cards;
        return
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    },
    openCustomizationDialog() {
      this.customizationDialog = true;
    },
    openCreateDialog() {
      this.dialogMode = "add";
      this.dialog = true;
      this.currentCard = { title: "", value: "", perChange: 0 };
    },
    openEditDialog(index) {
      this.dialogMode = "edit";
      this.editIndex = index;
      this.currentCard = { ...this.cards[index] };
      this.dialog = true;
    },
    async deleteCard(index) {
      try {
        const cardToDelete = this.cards[index];
        const response = await axios.delete(`http://localhost:3000/api/cards/${cardToDelete.id}`);
        this.cards.splice(index, 1);
        this.showSnackbar(response.data.message, 'error');
      } catch (error) {
        console.error("Error deleting card:", error);
      }
    },
    closeDialog() {
      this.dialog = false;
      this.editIndex = null;
    },
    async saveCard() {
      try {
        if (this.dialogMode === "add") {
          const response = await axios.post("http://localhost:3000/api/cards", this.currentCard);
          this.cards.push(response.data);
          this.showSnackbar(response.data.message, "#287F71");
        } else if (this.dialogMode === "edit" && this.editIndex !== null) {
          const updatedCard = { ...this.cards[this.editIndex], ...this.currentCard };
          const response = await axios.put(`http://localhost:3000/api/cards/${updatedCard.id}`, updatedCard);
          this.cards[this.editIndex] = response.data;
          this.showSnackbar(response.data.message, "#EB862A");
        }
        this.closeDialog();
      } catch (error) {
        console.error("Error saving card:", error);
      }
    },
    showSnackbar(message, color) {
      this.snackbar.message = message;
      this.snackbar.visible = true;
      this.snackbar.color = color;
    },
  },
};
</script>

<style scoped>
.outlined-btn {
  text-transform: capitalize;
  border: 1px solid #97a3b6;
  color: #97a3b6;
  border-radius: 8px;
}

.card-style {
  border: 1px solid gainsboro;
  border-radius: 10px;
  cursor: grab;
}

.comparison-text {
  font-size: 12px;
  color: #97a3b6;
}
</style>
