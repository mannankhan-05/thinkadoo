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
                    {{ getInitials(item.userName) }}
                  </v-avatar>
                  <div>
                    <div class="font-weight-medium">{{ item.userName }}</div>
                    <div class="text-caption text-medium-emphasis">
                      {{ item.userEmail }}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <div>{{ item.userAddress }}</div>
                  <div v-if="item.userApt" class="text-caption">
                    Apt: {{ item.userApt }}
                  </div>
                  <div class="text-caption">
                    {{ item.city }}, {{ item.zip }}, {{ item.country }}
                  </div>
                </div>
              </td>
              <td>{{ item.userPhone }}</td>
              <td>{{ formatCurrency(item.orderPrice) }}</td>
              <td>{{ item.deliveryType }}</td>
              <td>
                <v-chip :color="getStatusColor(item.status)" size="small">
                  {{ item.status }}
                </v-chip>
              </td>
              <td>{{ formatDate(item.orderDate) }}</td>
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
            {{ selectedOrder?.status }}
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
                      {{ getInitials(selectedOrder.userName) }}
                    </v-avatar>
                    <div>
                      <div class="text-h6">{{ selectedOrder.userName }}</div>
                      <div class="text-body-2">
                        {{ selectedOrder.userEmail }}
                      </div>
                      <div class="text-body-2">
                        {{ selectedOrder.userPhone }}
                      </div>
                    </div>
                  </div>

                  <v-divider class="mb-4"></v-divider>

                  <div class="text-subtitle-1 font-weight-bold mb-2">
                    Shipping Address
                  </div>
                  <div class="text-body-2">{{ selectedOrder.userAddress }}</div>
                  <div class="text-body-2" v-if="selectedOrder.userApt">
                    Apt: {{ selectedOrder.userApt }}
                  </div>
                  <div class="text-body-2">
                    {{ selectedOrder.city }}, {{ selectedOrder.zip }}
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
                      formatDate(selectedOrder.orderDate)
                    }}</span>
                  </div>
                  <div class="d-flex justify-space-between mb-2">
                    <span class="text-body-1">Delivery Type:</span>
                    <span class="text-body-1">{{
                      selectedOrder.deliveryType
                    }}</span>
                  </div>
                  <div class="d-flex justify-space-between mb-2">
                    <span class="text-body-1">Order Price:</span>
                    <span class="text-body-1 font-weight-bold">{{
                      formatCurrency(selectedOrder.orderPrice)
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
                          <v-icon>mdi-package-variant</v-icon>
                        </v-avatar>
                        <div>
                          <div class="font-weight-medium">{{ item.name }}</div>
                          <div class="text-caption" v-if="item.variant">
                            {{ item.variant }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ formatCurrency(item.price) }}</td>
                    <td>{{ formatCurrency(item.price * item.quantity) }}</td>
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
                      Tax:
                    </td>
                    <td>{{ formatCurrency(calculateTax()) }}</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="text-right font-weight-bold">
                      Total:
                    </td>
                    <td class="font-weight-bold">
                      {{ formatCurrency(selectedOrder.orderPrice) }}
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

interface Order {
  id: string;
  userName: string;
  userEmail: string;
  userAddress: string;
  userApt: string;
  city: string;
  zip: string;
  country: string;
  userPhone: string;
  orderPrice: number;
  deliveryType: string;
  status: string;
  orderDate: string;
}

interface StatusHistory {
  status: string;
  date: string;
}

interface OrderItem {
  name: string;
  variant: string;
  quantity: number;
  price: number;
  image?: string;
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
      shippingCost: 10.0,
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
        { title: "Express", value: "express" },
        { title: "Same Day", value: "same_day" },
      ],
      dateRanges: [
        { title: "All Time", value: "all" },
        { title: "Today", value: "today" },
        { title: "This Week", value: "this_week" },
        { title: "This Month", value: "this_month" },
        { title: "Last Month", value: "last_month" },
        { title: "Custom Range", value: "custom" },
      ],
      orders: [
        {
          id: "ORD-2023-001",
          userName: "John Smith",
          userEmail: "john.smith@example.com",
          userAddress: "123 Main Street",
          userApt: "Apt 4B",
          city: "New York",
          zip: "10001",
          country: "United States",
          userPhone: "+1 (555) 123-4567",
          orderPrice: 129.99,
          deliveryType: "standard",
          status: "delivered",
          orderDate: "2023-05-15",
        },
        {
          id: "ORD-2023-002",
          userName: "Emily Johnson",
          userEmail: "emily.johnson@example.com",
          userAddress: "456 Park Avenue",
          userApt: "",
          city: "Boston",
          zip: "02108",
          country: "United States",
          userPhone: "+1 (555) 987-6543",
          orderPrice: 89.5,
          deliveryType: "express",
          status: "shipped",
          orderDate: "2023-05-18",
        },
        {
          id: "ORD-2023-003",
          userName: "Michael Brown",
          userEmail: "michael.brown@example.com",
          userAddress: "789 Oak Street",
          userApt: "Suite 12",
          city: "Chicago",
          zip: "60601",
          country: "United States",
          userPhone: "+1 (555) 456-7890",
          orderPrice: 210.75,
          deliveryType: "standard",
          status: "processing",
          orderDate: "2023-05-20",
        },
        {
          id: "ORD-2023-004",
          userName: "Sarah Davis",
          userEmail: "sarah.davis@example.com",
          userAddress: "321 Maple Road",
          userApt: "",
          city: "Los Angeles",
          zip: "90001",
          country: "United States",
          userPhone: "+1 (555) 789-0123",
          orderPrice: 45.25,
          deliveryType: "same_day",
          status: "delivered",
          orderDate: "2023-05-22",
        },
        {
          id: "ORD-2023-005",
          userName: "David Wilson",
          userEmail: "david.wilson@example.com",
          userAddress: "654 Pine Street",
          userApt: "Apt 7C",
          city: "San Francisco",
          zip: "94101",
          country: "United States",
          userPhone: "+1 (555) 234-5678",
          orderPrice: 175.0,
          deliveryType: "express",
          status: "pending",
          orderDate: "2023-05-25",
        },
        {
          id: "ORD-2023-006",
          userName: "Jennifer Martinez",
          userEmail: "jennifer.martinez@example.com",
          userAddress: "987 Cedar Lane",
          userApt: "",
          city: "Miami",
          zip: "33101",
          country: "United States",
          userPhone: "+1 (555) 345-6789",
          orderPrice: 62.5,
          deliveryType: "standard",
          status: "cancelled",
          orderDate: "2023-05-27",
        },
        {
          id: "ORD-2023-007",
          userName: "Robert Taylor",
          userEmail: "robert.taylor@example.com",
          userAddress: "159 Birch Boulevard",
          userApt: "Unit 3",
          city: "Seattle",
          zip: "98101",
          country: "United States",
          userPhone: "+1 (555) 567-8901",
          orderPrice: 135.25,
          deliveryType: "express",
          status: "processing",
          orderDate: "2023-05-30",
        },
      ] as Order[],
      statusHistory: [
        { status: "pending", date: "2023-05-25T10:30:00" },
        { status: "processing", date: "2023-05-26T14:45:00" },
        { status: "shipped", date: "2023-05-27T09:15:00" },
      ] as StatusHistory[],
      orderItems: [
        {
          name: "Premium Headphones",
          variant: "Black",
          quantity: 1,
          price: 129.99,
        },
        {
          name: "Wireless Charger",
          variant: "White",
          quantity: 2,
          price: 24.99,
        },
        {
          name: "Phone Case",
          variant: "Clear",
          quantity: 1,
          price: 19.99,
        },
      ] as OrderItem[],
    };
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
            order.userName.toLowerCase().includes(searchLower) ||
            order.userEmail.toLowerCase().includes(searchLower) ||
            order.id.toLowerCase().includes(searchLower) ||
            order.userPhone.includes(searchLower)
        );
      }

      // Apply status filter
      if (this.statusFilter !== "all") {
        filtered = filtered.filter(
          (order) => order.status === this.statusFilter
        );
      }

      // Apply delivery type filter
      if (this.deliveryTypeFilter !== "all") {
        filtered = filtered.filter(
          (order) => order.deliveryType === this.deliveryTypeFilter
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
              const orderDate = new Date(order.orderDate);
              return (
                orderDate.getDate() === today.getDate() &&
                orderDate.getMonth() === today.getMonth() &&
                orderDate.getFullYear() === today.getFullYear()
              );
            });
            break;
          case "this_week":
            filtered = filtered.filter((order) => {
              const orderDate = new Date(order.orderDate);
              return orderDate >= startOfWeek && orderDate <= today;
            });
            break;
          case "this_month":
            filtered = filtered.filter((order) => {
              const orderDate = new Date(order.orderDate);
              return (
                orderDate.getMonth() === today.getMonth() &&
                orderDate.getFullYear() === today.getFullYear()
              );
            });
            break;
          case "last_month":
            filtered = filtered.filter((order) => {
              const orderDate = new Date(order.orderDate);
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
                const orderDate = new Date(order.orderDate);
                return orderDate >= startDate && orderDate <= endDate;
              });
            }
            break;
        }
      }

      return filtered;
    },
  },
  methods: {
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
    refreshOrders() {
      this.loading = true;
      // In a real app, this would fetch fresh data from the API
      setTimeout(() => {
        this.loading = false;
        // Show a snackbar or notification
        alert("Orders refreshed successfully");
      }, 1000);
    },
    exportOrders() {
      // In a real app, this would generate a CSV or Excel file
      alert("Orders exported successfully");
    },
    viewOrderDetails(order: Order) {
      this.selectedOrder = order;
      this.orderDetailsDialog = true;
    },
    updateOrderStatus(order: Order | null) {
      if (!order) return;

      this.selectedOrder = order;
      this.newStatus = order.status;
      this.statusNote = "";
      this.notifyCustomer = true;
      this.updateStatusDialog = true;
    },
    saveStatusUpdate() {
      if (!this.selectedOrder) return;

      // In a real app, this would update the order status in the database
      const index = this.orders.findIndex(
        (order) => order.id === this.selectedOrder?.id
      );
      if (index !== -1) {
        this.orders[index].status = this.newStatus;

        // Add to status history
        this.statusHistory.push({
          status: this.newStatus,
          date: new Date().toISOString(),
        });

        // Sort status history by date
        this.statusHistory.sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

        // Show a snackbar or notification
        alert(`Order status updated to ${this.newStatus}`);

        if (this.notifyCustomer) {
          // In a real app, this would send an email to the customer
          alert(`Notification sent to ${this.selectedOrder.userEmail}`);
        }
      }

      this.updateStatusDialog = false;
    },
    printOrder(order: Order) {
      // In a real app, this would open a print dialog
      alert(`Printing order ${order.id}`);
    },
    sendOrderConfirmation(order: Order) {
      // In a real app, this would send an email to the customer
      alert(`Confirmation sent to ${order.userEmail}`);
    },
    calculateSubtotal() {
      return this.orderItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
    calculateTax() {
      // Assuming tax is 8%
      return this.calculateSubtotal() * 0.08;
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
