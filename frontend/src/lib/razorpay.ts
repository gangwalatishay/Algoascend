export type RazorpaySuccessResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayInstance = {
  open: () => void;
};

type RazorpayConstructor = new (options: unknown) => RazorpayInstance;

function getWindow(): { Razorpay?: RazorpayConstructor } {
  return window as unknown as { Razorpay?: RazorpayConstructor };
}

export function loadRazorpayCheckout(): Promise<boolean> {
  return new Promise((resolve) => {
    if (getWindow().Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
};

export function openCheckout(
  options: RazorpayOptions,
  onSuccess: (resp: RazorpaySuccessResponse) => void,
  onFailure: () => void
) {
  const W = getWindow();
  const RP = W.Razorpay!;
  const rp = new RP({
    ...options,
    handler: onSuccess,
    modal: { ondismiss: onFailure },
    theme: { color: '#970747' },
  });
  rp.open();
}
