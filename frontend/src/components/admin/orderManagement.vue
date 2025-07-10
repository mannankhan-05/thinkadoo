<template>
  <v-container fluid>
    <div
      class="d-flex flex-column flex-md-row justify-space-between align-center mb-6"
    >
      <h1 class="page-title">Order Management</h1>
      <div class="d-flex align-center">
        <v-btn
          color="success"
          prepend-icon="mdi-refresh"
          @click="refreshOrders"
          class="mr-2"
        >
          Refresh
        </v-btn>
        <v-btn
          color="primary"
          prepend-icon="mdi-file-export"
          @click="exportOrders"
        >
          Export
        </v-btn>
      </div>
    </div>

    <v-card>
      <v-card-text>
        <div class="d-flex flex-column flex-md-row align-center mb-4">
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Search orders"
            single-line
            hide-details
            density="compact"
            class="mr-md-4 mb-4 mb-md-0"
          ></v-text-field>

          <v-select
            v-model="statusFilter"
            :items="statusOptions"
            label="Status"
            density="compact"
            hide-details
            class="mr-md-4 mb-4 mb-md-0 max-width-select"
          ></v-select>

          <v-select
            v-model="deliveryTypeFilter"
            :items="deliveryTypeOptions"
            label="Delivery Type"
            density="compact"
            hide-details
            class="mr-md-4 mb-4 mb-md-0 max-width-select"
          ></v-select>

          <v-menu
            v-model="dateMenu"
            :close-on-content-click="false"
            location="bottom end"
            transition="scale-transition"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="outlined"
                prepend-icon="mdi-calendar"
                class="mr-md-4 mb-4 mb-md-0"
              >
                {{ dateRangeText }}
              </v-btn>
            </template>
            <v-card min-width="300">
              <v-card-text>
                <v-select
                  v-model="dateRange"
                  :items="dateRanges"
                  label="Date Range"
                  variant="outlined"
                  density="compact"
                  hide-details
                ></v-select>
                <div v-if="dateRange === 'custom'" class="mt-3">
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        v-model="customDateRange.start"
                        label="Start Date"
                        type="date"
                        variant="outlined"
                        density="compact"
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="customDateRange.end"
                        label="End Date"
                        type="date"
                        variant="outlined"
                        density="compact"
                        hide-details
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" variant="text" @click="dateMenu = false">
                  Apply
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>

          <v-btn
            variant="text"
            color="primary"
            prepend-icon="mdi-refresh"
            @click="resetFilters"
          >
            Reset
          </v-btn>
        </div>

        <v-data-table
          :headers="headers"
          :items="filteredOrders"
          :loading="loading"
          :items-per-page="10"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>
                <div class="d-flex align-center">
                  <v-avatar color="primary" size="36" class="mr-3">
                    {{ getInitials(item.user_name) }}
                  </v-avatar>
                  <div>
                    <div class="font-weight-medium">{{ item.user_name }}</div>
                    <div class="text-caption text-medium-emphasis">
                      {{ item.user_email }}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <div>{{ item.user_address }}</div>
                  <div v-if="item.user_apt" class="text-caption">
                    Apt: {{ item.user_apt }}
                  </div>
                  <div class="text-caption">
                    {{ item.city }}, {{ item.zip_code }}, {{ item.country }}
                  </div>
                </div>
              </td>
              <td>{{ item.userPhone }}</td>
              <td>{{ formatCurrency(item.order_price) }}</td>
              <td>{{ item.delivery_type }}</td>
              <td>
                <v-chip :color="getStatusColor(item.order_status)" size="small">
                  {{ item.order_status }}
                </v-chip>
              </td>
              <td>{{ formatDate(item.order_date) }}</td>
              <td>
                <v-menu location="bottom end">
                  <template v-slot:activator="{ props }">
                    <v-btn icon variant="text" v-bind="props">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list density="compact">
                    <v-list-item
                      @click="viewOrderDetails(item)"
                      prepend-icon="mdi-eye"
                      title="View Details"
                    ></v-list-item>
                    <v-list-item
                      @click="updateOrderStatus(item)"
                      prepend-icon="mdi-pencil"
                      title="Update Status"
                    ></v-list-item>
                    <v-divider></v-divider>
                    <v-list-item
                      @click="printOrder(item)"
                      prepend-icon="mdi-printer"
                      title="Print Order"
                    ></v-list-item>
                    <v-list-item
                      @click="sendOrderConfirmation(item)"
                      prepend-icon="mdi-email-send"
                      title="Send Confirmation"
                    ></v-list-item>
                  </v-list>
                </v-menu>
              </td>
            </tr>
          </template>

          <template v-slot:no-data>
            <div class="d-flex flex-column align-center py-6">
              <v-icon
                icon="mdi-package-variant-closed"
                size="64"
                color="grey-lighten-1"
                class="mb-4"
              ></v-icon>
              <h3 class="text-h6 text-grey-darken-1">No orders found</h3>
              <p class="text-body-2 text-grey-darken-1 mb-4">
                Try changing your search criteria
              </p>
              <v-btn
                color="primary"
                prepend-icon="mdi-refresh"
                @click="resetFilters"
              >
                Reset Filters
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Order Details Dialog -->
    <v-dialog v-model="orderDetailsDialog" max-width="800">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span>Order Details</span>
          <v-chip
            :color="getStatusColor(selectedOrder?.status)"
            size="small"
            v-if="selectedOrder"
          >
            {{ selectedOrder?.order_status }}
          </v-chip>
        </v-card-title>
        <v-card-text v-if="selectedOrder">
          <v-row>
            <v-col cols="12" md="6">
              <v-card variant="outlined" class="mb-4">
                <v-card-title>Customer Information</v-card-title>
                <v-card-text>
                  <div class="d-flex align-center mb-4">
                    <v-avatar color="primary" size="48" class="mr-4">
                      {{ getInitials(selectedOrder.user_name) }}
                    </v-avatar>
                    <div>
                      <div class="text-h6">{{ selectedOrder.user_name }}</div>
                      <div class="text-body-2">
                        {{ selectedOrder.user_email }}
                      </div>
                      <div class="text-body-2">
                        {{ selectedOrder.user_phone }}
                      </div>
                    </div>
                  </div>

                  <v-divider class="mb-4"></v-divider>

                  <div class="text-subtitle-1 font-weight-bold mb-2">
                    Shipping Address
                  </div>
                  <div class="text-body-2">
                    {{ selectedOrder.user_address }}
                  </div>
                  <div class="text-body-2" v-if="selectedOrder.user_apt">
                    Apt: {{ selectedOrder.user_apt }}
                  </div>
                  <div class="text-body-2">
                    {{ selectedOrder.city }}, {{ selectedOrder.zip_code }}
                  </div>
                  <div class="text-body-2">{{ selectedOrder.country }}</div>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="mb-4">
                <v-card-title>Order Information</v-card-title>
                <v-card-text>
                  <div class="d-flex justify-space-between mb-2">
                    <span class="text-body-1">Order ID:</span>
                    <span class="text-body-1 font-weight-medium">{{
                      selectedOrder.id
                    }}</span>
                  </div>
                  <div class="d-flex justify-space-between mb-2">
                    <span class="text-body-1">Order Date:</span>
                    <span class="text-body-1">{{
                      formatDate(selectedOrder.order_date)
                    }}</span>
                  </div>
                  <div class="d-flex justify-space-between mb-2">
                    <span class="text-body-1">Delivery Type:</span>
                    <span class="text-body-1">{{
                      selectedOrder.delivery_type
                    }}</span>
                  </div>
                  <div class="d-flex justify-space-between mb-2">
                    <span class="text-body-1">Order Price:</span>
                    <span class="text-body-1 font-weight-bold">{{
                      formatCurrency(selectedOrder.order_price)
                    }}</span>
                  </div>

                  <v-divider class="my-4"></v-divider>

                  <div class="text-subtitle-1 font-weight-bold mb-2">
                    Status History
                  </div>
                  <v-timeline density="compact" align="start">
                    <v-timeline-item
                      v-for="(status, index) in statusHistory"
                      :key="index"
                      :dot-color="getStatusColor(status.status)"
                      size="small"
                    >
                      <div class="d-flex justify-space-between">
                        <span class="text-body-2 font-weight-medium">{{
                          status.status
                        }}</span>
                        <span class="text-caption text-medium-emphasis">{{
                          formatDate(status.date)
                        }}</span>
                      </div>
                    </v-timeline-item>
                  </v-timeline>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-card variant="outlined">
            <v-card-title>Order Items</v-card-title>
            <v-card-text class="pa-0">
              <v-table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in orderItems" :key="index">
                    <td>
                      <div class="d-flex align-center">
                        <v-avatar class="mr-3" color="grey-lighten-3">
                          <img
                            :src="item.book.image"
                            alt="Book Image"
                            class="rounded"
                            style="width: 40px; height: 40px; object-fit: cover"
                          />
                        </v-avatar>
                        <div>
                          <div class="font-weight-medium">
                            {{ item.book.title }}
                          </div>
                          <div class="text-caption" v-if="item.variant"></div>
                        </div>
                      </div>
                    </td>
                    <td>1</td>
                    <td>{{ formatCurrency(item.book.price) }}</td>
                    <td>
                      {{ formatCurrency(item.book.price) }}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" class="text-right font-weight-bold">
                      Subtotal:
                    </td>
                    <td>{{ formatCurrency(calculateSubtotal()) }}</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="text-right font-weight-bold">
                      Shipping:
                    </td>
                    <td>{{ formatCurrency(shippingCost) }}</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="text-right font-weight-bold">
                      Total:
                    </td>
                    <td class="font-weight-bold">
                      {{ formatCurrency(selectedOrder.order_price) }}
                    </td>
                  </tr>
                </tfoot>
              </v-table>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="text"
            @click="updateOrderStatus(selectedOrder)"
          >
            Update Status
          </v-btn>
          <v-btn
            color="grey-darken-1"
            variant="text"
            @click="orderDetailsDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Update Status Dialog -->
    <v-dialog v-model="updateStatusDialog" max-width="500">
      <v-card>
        <v-card-title>Update Order Status</v-card-title>
        <v-card-text>
          <v-select
            v-model="newStatus"
            :items="allStatusOptions"
            label="Status"
            variant="outlined"
            density="comfortable"
          ></v-select>

          <v-textarea
            v-model="statusNote"
            label="Note (Optional)"
            variant="outlined"
            rows="3"
            placeholder="Add a note about this status change"
          ></v-textarea>

          <v-checkbox
            v-model="notifyCustomer"
            label="Notify customer about this update"
            color="primary"
          ></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey-darken-1"
            variant="text"
            @click="updateStatusDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn color="primary" @click="saveStatusUpdate"> Update </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosInstance from "../../api/axiosInstance";

interface Order {
  id: string;
  user_name: string;
  user_email: string;
  user_address: string;
  user_apt: string;
  city: string;
  zip_code: string;
  country: string;
  user_phone: string;
  order_price: number;
  delivery_type: string;
  order_status: string;
  order_date: string;
}

interface StatusHistory {
  status: string;
  date: string;
}

interface OrderItem {
  id: number;
  order: {
    delivery_type: string;
  };
  book: {
    id: number;
    title: string;
    image: string;
    description: string;
    price: number;
  };
}

export default defineComponent({
  name: "OrderManagementView",
  data() {
    return {
      loading: false,
      search: "",
      statusFilter: "all",
      deliveryTypeFilter: "all",
      dateRange: "all",
      dateMenu: false,
      customDateRange: {
        start: "",
        end: "",
      },
      orderDetailsDialog: false,
      updateStatusDialog: false,
      selectedOrder: null as Order | null,
      newStatus: "",
      statusNote: "",
      notifyCustomer: true,
      headers: [
        { title: "Customer", key: "userName" },
        { title: "Address", key: "userAddress" },
        { title: "Phone", key: "userPhone" },
        { title: "Price", key: "orderPrice" },
        { title: "Delivery", key: "deliveryType" },
        { title: "Status", key: "status" },
        { title: "Date", key: "orderDate" },
        { title: "Actions", key: "actions" },
      ],
      statusOptions: [
        { title: "All Statuses", value: "all" },
        { title: "Pending", value: "pending" },
        { title: "Processing", value: "processing" },
        { title: "Shipped", value: "shipped" },
        { title: "Delivered", value: "delivered" },
        { title: "Cancelled", value: "cancelled" },
      ],
      allStatusOptions: [
        { title: "Pending", value: "pending" },
        { title: "Processing", value: "processing" },
        { title: "Shipped", value: "shipped" },
        { title: "Delivered", value: "delivered" },
        { title: "Cancelled", value: "cancelled" },
      ],
      deliveryTypeOptions: [
        { title: "All Types", value: "all" },
        { title: "Standard", value: "standard" },
        { title: "Fast", value: "fast" },
      ],
      dateRanges: [
        { title: "All Time", value: "all" },
        { title: "Today", value: "today" },
        { title: "This Week", value: "this_week" },
        { title: "This Month", value: "this_month" },
        { title: "Last Month", value: "last_month" },
        { title: "Custom Range", value: "custom" },
      ],
      orders: [] as Order[],
      statusHistory: [
        { status: "pending", date: "2023-05-25T14:45:00" },
        { status: "processing", date: "2023-05-26T14:45:00" },
        { status: "shipped", date: "2023-05-27T09:15:00" },
      ] as StatusHistory[],
      orderItems: [] as OrderItem[],
    };
  },

  async mounted() {
    await this.fetchOrders();
  },

  computed: {
    dateRangeText() {
      switch (this.dateRange) {
        case "all":
          return "All Time";
        case "today":
          return "Today";
        case "this_week":
          return "This Week";
        case "this_month":
          return "This Month";
        case "last_month":
          return "Last Month";
        case "custom":
          return `${this.customDateRange.start} - ${this.customDateRange.end}`;
        default:
          return "Select Date Range";
      }
    },
    filteredOrders() {
      let filtered = [...this.orders];

      // Apply search filter
      if (this.search) {
        const searchLower = this.search.toLowerCase();
        filtered = filtered.filter(
          (order) =>
            order.user_name.toLowerCase().includes(searchLower) ||
            order.user_email.toLowerCase().includes(searchLower) ||
            order.id.toLowerCase().includes(searchLower) ||
            order.user_phone.includes(searchLower)
        );
      }

      // Apply status filter
      if (this.statusFilter !== "all") {
        filtered = filtered.filter(
          (order) => order.order_status === this.statusFilter
        );
      }

      // Apply delivery type filter
      if (this.deliveryTypeFilter !== "all") {
        filtered = filtered.filter(
          (order) => order.delivery_type === this.deliveryTypeFilter
        );
      }

      // Apply date filter
      if (this.dateRange !== "all") {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());

        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const startOfLastMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1
        );
        const endOfLastMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          0
        );

        switch (this.dateRange) {
          case "today":
            filtered = filtered.filter((order) => {
              const orderDate = new Date(order.order_date);
              return (
                orderDate.getDate() === today.getDate() &&
                orderDate.getMonth() === today.getMonth() &&
                orderDate.getFullYear() === today.getFullYear()
              );
            });
            break;
          case "this_week":
            filtered = filtered.filter((order) => {
              const orderDate = new Date(order.order_date);
              return orderDate >= startOfWeek && orderDate <= today;
            });
            break;
          case "this_month":
            filtered = filtered.filter((order) => {
              const orderDate = new Date(order.order_date);
              return (
                orderDate.getMonth() === today.getMonth() &&
                orderDate.getFullYear() === today.getFullYear()
              );
            });
            break;
          case "last_month":
            filtered = filtered.filter((order) => {
              const orderDate = new Date(order.order_date);
              return (
                orderDate >= startOfLastMonth && orderDate <= endOfLastMonth
              );
            });
            break;
          case "custom":
            if (this.customDateRange.start && this.customDateRange.end) {
              const startDate = new Date(this.customDateRange.start);
              const endDate = new Date(this.customDateRange.end);
              filtered = filtered.filter((order) => {
                const orderDate = new Date(order.order_date);
                return orderDate >= startDate && orderDate <= endDate;
              });
            }
            break;
        }
      }

      return filtered;
    },
    shippingCost() {
      const deliveryType = this.orderItems[0]?.order?.delivery_type;

      if (deliveryType === "standard") {
        return 9.99;
      } else if (deliveryType === "fast") {
        return 24.99;
      } else {
        return 0;
      }
    },
  },
  methods: {
    async fetchOrders() {
      let response = await axiosInstance.get("/orders");
      this.orders = response.data;
      console.log("Fetched orders:", this.orders);
    },

    formatCurrency(amount: number) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    },
    formatDate(dateString: string) {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(date);
    },
    getInitials(name: string) {
      return name
        .split(" ")
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase()
        .substring(0, 2);
    },
    getStatusColor(status: string | undefined) {
      if (!status) return "grey";

      switch (status.toLowerCase()) {
        case "pending":
          return "warning";
        case "processing":
          return "info";
        case "shipped":
          return "primary";
        case "delivered":
          return "success";
        case "cancelled":
          return "error";
        default:
          return "grey";
      }
    },
    resetFilters() {
      this.search = "";
      this.statusFilter = "all";
      this.deliveryTypeFilter = "all";
      this.dateRange = "all";
      this.customDateRange = {
        start: "",
        end: "",
      };
    },
    async refreshOrders() {
      this.loading = true;
      await this.fetchOrders();
      this.loading = false;
    },
    exportOrders() {
      // In a real app, this would generate a CSV or Excel file
      alert("Orders exported successfully");
    },
    async viewOrderDetails(order: Order) {
      this.selectedOrder = order;
      this.orderDetailsDialog = true;

      // fetching the Order Items
      let response = await axiosInstance
        .get(`/orderItems/${order.id}`)
        .then((response) => {
          this.orderItems = response.data;
        });
      console.log("Fetched order items:", this.orderItems);
    },
    updateOrderStatus(order: Order | null) {
      if (!order) return;

      this.selectedOrder = order;
      this.newStatus = order.order_status;
      this.statusNote = "";
      this.notifyCustomer = true;
      this.updateStatusDialog = true;
    },
    async saveStatusUpdate() {
      if (!this.selectedOrder) return;

      await axiosInstance.put(`/updateOrderStatus/${this.selectedOrder?.id}`, {
        status: this.newStatus,
      });

      this.updateStatusDialog = false;
    },
    printOrder(order: Order) {
      // In a real app, this would open a print dialog
      alert(`Printing order ${order.id}`);
    },
    sendOrderConfirmation(order: Order) {
      // In a real app, this would send an email to the customer
      alert(`Confirmation sent to ${order.user_email}`);
    },
    calculateSubtotal() {
      return this.orderItems.reduce((total, item) => {
        return total + item.book.price;
      }, 0);
    },
  },
});
</script>

<style scoped>
.max-width-select {
  max-width: 200px;
}

.v-table tfoot tr td {
  font-weight: 500;
}

.text-right {
  text-align: right;
}
</style>
