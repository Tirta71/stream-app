const midtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY ?? "";
const isMidtransProduction =
  import.meta.env.VITE_MIDTRANS_IS_PRODUCTION === "true";
const midtransSnapScriptUrl = isMidtransProduction
  ? "https://app.midtrans.com/snap/snap.js"
  : "https://app.sandbox.midtrans.com/snap/snap.js";

let snapScriptPromise = null;

function loadMidtransSnapScript() {
  if (window.snap) {
    return Promise.resolve(window.snap);
  }

  if (!midtransClientKey) {
    return Promise.reject(new Error("Client key Midtrans belum tersedia"));
  }

  if (snapScriptPromise) {
    return snapScriptPromise;
  }

  snapScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");

    script.dataset.clientKey = midtransClientKey;
    script.src = midtransSnapScriptUrl;
    script.onload = () => resolve(window.snap);
    script.onerror = () => reject(new Error("Gagal memuat Midtrans Snap"));

    document.body.appendChild(script);
  });

  return snapScriptPromise;
}

async function openMidtransPayment(payment, callbacks = {}) {
  if (!payment?.snapToken && payment?.redirectUrl) {
    window.location.assign(payment.redirectUrl);
    return;
  }

  if (!payment?.snapToken) {
    throw new Error("Token pembayaran Midtrans belum tersedia");
  }

  try {
    const snap = await loadMidtransSnapScript();

    snap.pay(payment.snapToken, callbacks);
  } catch (error) {
    if (payment.redirectUrl) {
      window.location.assign(payment.redirectUrl);
      return;
    }

    throw error;
  }
}

export { openMidtransPayment };
