<template>
  <v-row justify="center">
    <v-col cols="12" lg="4" md="4" sm="6" xs="10">
      <!-- Order Delivery Sheet -->
      <v-sheet class="order-delivery-sheet">
        <v-radio-group v-model="localDeliveryType">
          <template v-slot:label></template>

          <v-radio
            value="standard"
            @click="selectDeliveryType('standard')"
            class="mt-7"
          >
            <template v-slot:label>
              <h2 class="delivery-type ml-3">
                Standard Delivery <span class="price">9.99$</span>
                <p class="order-delivery-date">
                  Your Order Will Be Delivered To You at
                  {{ getDeliveryDate(15) }}
                </p>
              </h2>
            </template>
          </v-radio>

          <v-divider :thickness="5" class="mt-7 mb-7"></v-divider>

          <v-radio
            value="fast"
            @click="selectDeliveryType('fast')"
            class="mb-7"
          >
            <template v-slot:label>
              <h2 class="delivery-type ml-3">
                Fast Delivery <span class="price">25.99$</span>
                <p class="order-delivery-date">
                  Your Order Will Be Delivered To You at
                  {{ getDeliveryDate(10) }}
                </p>
              </h2>
            </template>
          </v-radio>
        </v-radio-group>
      </v-sheet>

      <div class="d-flex justify-center mt-15">
        <v-btn class="continue-button" @click="saveDeliveryType">
          Continue to Review
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CheckoutStep2",

  props: {
    deliveryData: {
      type: Object,
      required: true,
    },
  },

  emits: ["update-delivery", "next-step"],

  data() {
    return {
      localDeliveryType: this.deliveryData.type || "",
    };
  },

  watch: {
    deliveryData: {
      handler(newVal) {
        this.localDeliveryType = newVal.type || "";
      },
      deep: true,
    },
  },

  methods: {
    getDeliveryDate(days: number) {
      return new Date(
        Date.now() + days * 24 * 60 * 60 * 1000
      ).toLocaleDateString();
    },

    selectDeliveryType(type: string) {
      this.localDeliveryType = type;

      const deliveryInfo = {
        type: type,
        price: type === "standard" ? 9.99 : 25.99,
        estimatedDate: this.getDeliveryDate(type === "standard" ? 15 : 10),
      };

      this.$emit("update-delivery", deliveryInfo);
    },

    saveDeliveryType() {
      if (!this.localDeliveryType) {
        alert("Please select a delivery type.");
        return;
      }

      this.$emit("next-step");
    },
  },
});
</script>

<style scoped>
.order-delivery-sheet {
  width: 100%;
  height: auto;
  margin-top: 130px;
  display: flex;
  flex-direction: column;
  font-family: "Bitter", serif;
}

.continue-button {
  background-color: #283618;
  color: white;
  font-size: 25px;
  width: 70%;
  height: 65px;
  border-radius: 8px;
}

.order-delivery-date {
  font-size: 17px;
  font-weight: 400;
  margin-top: 10px;
}

.delivery-type {
  font-size: 30px;
  font-weight: bold;
}

.price {
  position: absolute;
  right: 80px;
}

@media (max-width: 600px) {
  .price {
    position: relative;
    right: 0;
  }
}
</style>
