declare module 'razorpay' {
  export default class Razorpay {
    constructor(options: {
      key_id: string;
      key_secret: string;
    });

    orders: {
      create(options: {
        amount: number;
        currency: string;
        receipt: string;
        notes?: Record<string, any>;
        payment_capture?: 0 | 1;
      }): Promise<{
        id: string;
        entity: string;
        amount: number;
        amount_paid: number;
        amount_due: number;
        currency: string;
        receipt: string;
        status: string;
        attempts: number;
        notes: Record<string, any>;
        created_at: number;
      }>;
    };

    // Add utility methods for payment verification
    utils: {
      validateWebhookSignature(
        body: string,
        signature: string,
        secret: string
      ): boolean;
    };
  }
}
