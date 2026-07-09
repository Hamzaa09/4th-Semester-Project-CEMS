import React, { useEffect, useState } from "react";
import { getSingleOrderThunk } from "../../../store/order/order.thunk";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProductThunk } from "../../../store/product/product.thunk";
import { getSingleUserThunk } from "../../../store/user/user.thunk";

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  const { order } = useSelector((state) => state.orderSlice);
  const [productsData, setProductsData] = useState([]);
  const [booker, setBooker] = useState({});

  useEffect(() => {
    if (id) {
      dispatch(getSingleOrderThunk({ id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!order) return;

      const parsed = order.product_items.map((prod) => prod.productId);

      const results = await Promise.all(
        parsed.map(async (p, index) => {
          const res = await dispatch(getSingleProductThunk({ id: p }));

          return {
            quantity: order.product_items[index].quantity,
            booker_id: order.booker_id,
            productInfo: res.payload.product,
          };
        }),
      );

      setProductsData(results);
    };

    fetchProducts();
  }, [order, dispatch]);

  useEffect(() => {
    const bookerCall = async () => {
      if (order?.booker_id) {
        const result = await dispatch(
          getSingleUserThunk({ id: order?.booker_id }),
        );
        if (result.payload) setBooker(result.payload.user);
      }
    };

    bookerCall();
  }, [order?.booker_id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex justify-center pt-10">
        <div className="w-full max-w-3xl">
          <button
            onClick={() => navigate(-1)}
            className="bg-white border border-gray-200 px-4 py-2 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm"
          >
            Back
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-5 mb-10">
        <div className="bg-white border border-gray-200 shadow-sm p-8 w-full max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6 border-b border-gray-200 pb-4">
            Order Details
          </h2>

          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div>
              <span className="font-medium text-gray-500">Order ID:</span>{" "}
              <span className="text-gray-900">
                {order?._id ? `#${order._id.slice(-5)}` : "N/A"}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-500">Created At:</span>{" "}
              <span className="text-gray-900">
                {new Date(order?.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-500">Shop Name:</span>{" "}
              <span className="text-gray-900">{order?.shop_name}</span>
            </div>
            <div>
              <span className="font-medium text-gray-500">Status:</span>{" "}
              <span className="text-emerald-600 font-medium">
                {order?.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Customer Info */}
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-3">
            Booker Information
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div>
              <span className="font-medium text-gray-500">Booker Name:</span>{" "}
              <span className="text-gray-900">
                {user.role === "booker" ? user?.fullName : booker?.fullName}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-500">Phone:</span>{" "}
              <span className="text-gray-900">
                {user.role === "booker"
                  ? user?.phoneNumber
                  : booker?.phoneNumber}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-500">Email:</span>{" "}
              <span className="text-gray-900">
                {user.role === "booker" ? user?.email : booker?.email}
              </span>
            </div>
          </div>

          {/* Items List */}
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-3">
            Ordered Items
          </h3>
          <table className="w-full text-sm border border-gray-200 mb-6">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-200 p-2 text-left text-gray-700">Item</th>
                <th className="border border-gray-200 p-2 text-center text-gray-700">Qty</th>
                <th className="border border-gray-200 p-2 text-center text-gray-700">Unit Price</th>
                <th className="border border-gray-200 p-2 text-right text-gray-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-200 p-2 text-gray-900">
                    {item.productInfo?.product_title}
                  </td>
                  <td className="border border-gray-200 p-2 text-center text-gray-900">
                    {item.quantity}
                  </td>

                  <td className="border border-gray-200 p-2 text-center text-gray-900">
                    {item.productInfo?.product_price} PKR
                  </td>

                  <td className="border border-gray-200 p-2 text-right text-gray-900">
                    {Number(item.productInfo?.product_price) *
                      Number(item.quantity)}{" "}
                    PKR
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Payment Summary */}
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-3">
            Payment Summary
          </h3>
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal:</span>
              <span className="text-gray-900">{order?.total_price} PKR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Discount (10%):</span>
              <span className="text-gray-900">
                {order?.total_price * 0.1} PKR
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tax (5%):</span>
              <span className="text-gray-900">
                {order?.total_price * 0.05} PKR
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-3 mt-2">
              <span className="font-semibold text-gray-900">
                Total Payment:
              </span>
              <span className="font-semibold text-emerald-600">
                {Number(order?.total_price) -
                  Number(order?.total_price * 0.1) +
                  Number(order?.total_price * 0.05)}{" "}
                PKR
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Payment Method:</span>
              <span className="text-gray-900">
                {order?.payment_type == "online"
                  ? "Online"
                  : "Cash On Delivery"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;