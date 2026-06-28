import crypto from "crypto";
import midtransClient from "midtrans-client";
import env from "./env.js";
import ApiError from "../utils/ApiError.js";

const getSnapClient = () => {
  if (!env.midtransServerKey || !env.midtransClientKey) {
    throw new ApiError(
      500,
      "Konfigurasi Midtrans belum lengkap",
      null,
      "MIDTRANS_NOT_CONFIGURED",
    );
  }

  return new midtransClient.Snap({
    clientKey: env.midtransClientKey,
    isProduction: env.midtransIsProduction,
    serverKey: env.midtransServerKey,
  });
};

const getCoreClient = () => {
  if (!env.midtransServerKey || !env.midtransClientKey) {
    throw new ApiError(
      500,
      "Konfigurasi Midtrans belum lengkap",
      null,
      "MIDTRANS_NOT_CONFIGURED",
    );
  }

  return new midtransClient.CoreApi({
    clientKey: env.midtransClientKey,
    isProduction: env.midtransIsProduction,
    serverKey: env.midtransServerKey,
  });
};

const createSnapTransaction = (payload) => getSnapClient().createTransaction(payload);

const getTransactionStatus = (orderCode) =>
  getCoreClient().transaction.status(orderCode);

const createSignatureKey = ({ grossAmount, orderId, statusCode }) =>
  crypto
    .createHash("sha512")
    .update(`${orderId}${statusCode}${grossAmount}${env.midtransServerKey}`)
    .digest("hex");

const verifySignatureKey = (notification) => {
  if (!env.midtransServerKey) {
    throw new ApiError(
      500,
      "Konfigurasi Midtrans belum lengkap",
      null,
      "MIDTRANS_NOT_CONFIGURED",
    );
  }

  const expectedSignature = createSignatureKey({
    grossAmount: notification.gross_amount,
    orderId: notification.order_id,
    statusCode: notification.status_code,
  });

  return expectedSignature === notification.signature_key;
};

export { createSnapTransaction, getTransactionStatus, verifySignatureKey };
