import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Check, AlertCircle } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (paymentData: any) => void;
  bookingData: {
    totalAmount: number;
    duration: string;
    spaceName: string;
    organizerName: string;
  };
}

type PaymentMethod = 'mpesa' | 'paypal';

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  bookingData
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('mpesa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [paymentStep, setPaymentStep] = useState<'select' | 'details' | 'processing' | 'success'>('select');

  if (!isOpen) return null;

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentStep('processing');

    // Simulate payment processing
    setTimeout(() => {
      const paymentData = {
        method: selectedMethod,
        transactionId: `TXN${Date.now()}`,
        amount: bookingData.totalAmount,
        ...(selectedMethod === 'mpesa' ? { phone: mpesaPhone } : { email: paypalEmail })
      };
      
      setPaymentStep('success');
      setTimeout(() => {
        onPaymentSuccess(paymentData);
        setIsProcessing(false);
      }, 2000);
    }, 3000);
  };

  const resetModal = () => {
    setPaymentStep('select');
    setIsProcessing(false);
    setMpesaPhone('');
    setPaypalEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Complete Payment</h2>
          <button
            onClick={resetModal}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isProcessing}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Booking Summary */}
        <div className="p-6 bg-gray-50 border-b">
          <h3 className="font-medium text-gray-900 mb-3">Booking Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Space:</span>
              <span className="font-medium">{bookingData.spaceName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium">{bookingData.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Organizer:</span>
              <span className="font-medium">{bookingData.organizerName}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-green-600 pt-2 border-t">
              <span>Total Amount:</span>
              <span>Ksh {bookingData.totalAmount.toFixed(0)}</span>
            </div>
          </div>
        </div>

        {/* Payment Content */}
        <div className="p-6">
          {paymentStep === 'select' && (
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 mb-4">Choose Payment Method</h3>
              
              {/* M-Pesa Option */}
              <div
                className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedMethod === 'mpesa'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedMethod('mpesa')}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">M-Pesa</h4>
                    <p className="text-sm text-gray-600">Pay using your M-Pesa mobile wallet</p>
                  </div>
                  {selectedMethod === 'mpesa' && (
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* PayPal Option */}
              <div
                className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedMethod === 'paypal'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedMethod('paypal')}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">PayPal</h4>
                    <p className="text-sm text-gray-600">Pay securely with PayPal or credit card</p>
                  </div>
                  {selectedMethod === 'paypal' && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => setPaymentStep('details')}
                className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {paymentStep === 'details' && (
            <div className="space-y-4">
              <button
                onClick={() => setPaymentStep('select')}
                className="text-sm text-gray-600 hover:text-gray-800 mb-4"
              >
                ← Back to payment methods
              </button>

              {selectedMethod === 'mpesa' && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">M-Pesa Payment Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        M-Pesa Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={mpesaPhone}
                        onChange={(e) => setMpesaPhone(e.target.value)}
                        placeholder="254712345678"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Enter your M-Pesa registered phone number
                      </p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-green-800">Payment Instructions:</p>
                          <ol className="list-decimal list-inside text-green-700 mt-2 space-y-1">
                            <li>You will receive an M-Pesa STK push notification</li>
                            <li>Enter your M-Pesa PIN to complete the payment</li>
                            <li>You will receive a confirmation SMS</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === 'paypal' && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">PayPal Payment Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PayPal Email Address *
                      </label>
                      <input
                        type="email"
                        value={paypalEmail}
                        onChange={(e) => setPaypalEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-blue-800">Payment Process:</p>
                          <ol className="list-decimal list-inside text-blue-700 mt-2 space-y-1">
                            <li>You will be redirected to PayPal's secure checkout</li>
                            <li>Log in to your PayPal account or pay as guest</li>
                            <li>Confirm the payment details and submit</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={
                  (selectedMethod === 'mpesa' && !mpesaPhone) ||
                  (selectedMethod === 'paypal' && !paypalEmail)
                }
                className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Pay Ksh {bookingData.totalAmount.toFixed(0)}
              </button>
            </div>
          )}

          {paymentStep === 'processing' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Processing Payment...</h3>
              <p className="text-sm text-gray-600">
                {selectedMethod === 'mpesa' 
                  ? 'Please check your phone for the M-Pesa prompt and enter your PIN'
                  : 'Redirecting to PayPal secure checkout...'
                }
              </p>
            </div>
          )}

          {paymentStep === 'success' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Payment Successful!</h3>
              <p className="text-sm text-gray-600">
                Your booking has been confirmed. You will receive a confirmation email shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
