import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Shield, Calendar, Clock, User, Smartphone, Wallet, Building2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import type { Doctor } from "../data/mockData";
import { toast } from "sonner";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: Doctor;
  date: Date | undefined;
  timeSlot: string;
}

type PaymentMethod = "credit-card" | "debit-card" | "upi" | "wallet" | "net-banking";

export function PaymentDialog({
  open,
  onOpenChange,
  doctor,
  date,
  timeSlot,
}: PaymentDialogProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit-card");
  
  // Credit/Debit Card State
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  
  // UPI State
  const [upiId, setUpiId] = useState("");
  
  // Wallet State
  const [walletType, setWalletType] = useState("paytm");
  const [walletPhone, setWalletPhone] = useState("");
  
  // Net Banking State
  const [bankName, setBankName] = useState("");

  const handlePayment = () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
      toast.success("Appointment booked successfully!", {
        description: `Your appointment with ${doctor.name} has been confirmed.`,
      });
      navigate("/");
    }, 2000);
  };

  const isFormValid = () => {
    switch (paymentMethod) {
      case "credit-card":
      case "debit-card":
        return (
          cardNumber.length >= 16 &&
          expiryDate.length >= 5 &&
          cvv.length >= 3 &&
          cardholderName.length > 0
        );
      case "upi":
        return upiId.length > 0 && upiId.includes("@");
      case "wallet":
        return walletPhone.length >= 10;
      case "net-banking":
        return bankName.length > 0;
      default:
        return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Confirm & Pay</DialogTitle>
          <DialogDescription>
            Complete your payment to confirm the appointment
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Appointment Summary */}
          <div className="p-4 bg-blue-50 rounded-lg space-y-3">
            <h3 className="text-gray-900">Appointment Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <User className="h-4 w-4 text-blue-600" />
                <span>{doctor.name}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span>{date?.toLocaleDateString("en-US", { 
                  weekday: "long", 
                  year: "numeric", 
                  month: "long", 
                  day: "numeric" 
                })}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>{timeSlot}</span>
              </div>
            </div>
            <Separator className="bg-blue-200" />
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Consultation Fee</span>
              <span className="text-xl text-blue-600">${doctor.consultationFee}</span>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-900">
              <CreditCard className="h-5 w-5" />
              <h3>Payment Method</h3>
            </div>

            {/* Payment Method Selection */}
            <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card" className="flex items-center gap-2 cursor-pointer flex-1">
                    <CreditCard className="h-4 w-4 text-gray-600" />
                    <span>Credit Card</span>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="debit-card" id="debit-card" />
                  <Label htmlFor="debit-card" className="flex items-center gap-2 cursor-pointer flex-1">
                    <CreditCard className="h-4 w-4 text-gray-600" />
                    <span>Debit Card</span>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Smartphone className="h-4 w-4 text-gray-600" />
                    <span>UPI</span>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="wallet" id="wallet" />
                  <Label htmlFor="wallet" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Wallet className="h-4 w-4 text-gray-600" />
                    <span>Digital Wallet</span>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="net-banking" id="net-banking" />
                  <Label htmlFor="net-banking" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Building2 className="h-4 w-4 text-gray-600" />
                    <span>Net Banking</span>
                  </Label>
                </div>
              </div>
            </RadioGroup>

            {/* Card Payment Form */}
            {(paymentMethod === "credit-card" || paymentMethod === "debit-card") && (
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 16) {
                        setCardNumber(value);
                      }
                    }}
                    maxLength={16}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "");
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + "/" + value.slice(2, 4);
                        }
                        if (value.length <= 5) {
                          setExpiryDate(value);
                        }
                      }}
                      maxLength={5}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      type="password"
                      value={cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 4) {
                          setCvv(value);
                        }
                      }}
                      maxLength={4}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardholderName">Cardholder Name</Label>
                  <Input
                    id="cardholderName"
                    placeholder="John Doe"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* UPI Payment Form */}
            {paymentMethod === "upi" && (
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Enter your UPI ID (e.g., mobile@paytm, user@phonepe)
                  </p>
                </div>
              </div>
            )}

            {/* Wallet Payment Form */}
            {paymentMethod === "wallet" && (
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="walletType">Select Wallet</Label>
                  <select
                    id="walletType"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={walletType}
                    onChange={(e) => setWalletType(e.target.value)}
                  >
                    <option value="paytm">Paytm</option>
                    <option value="phonepe">PhonePe</option>
                    <option value="googlepay">Google Pay</option>
                    <option value="amazonpay">Amazon Pay</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="walletPhone">Phone Number</Label>
                  <Input
                    id="walletPhone"
                    placeholder="Enter your phone number"
                    value={walletPhone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 10) {
                        setWalletPhone(value);
                      }
                    }}
                    maxLength={10}
                  />
                </div>
              </div>
            )}

            {/* Net Banking Form */}
            {paymentMethod === "net-banking" && (
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Select Bank</Label>
                  <select
                    id="bankName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  >
                    <option value="">Choose your bank</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                    <option value="pnb">Punjab National Bank</option>
                    <option value="bob">Bank of Baroda</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Security Notice */}
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
            <Shield className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-green-900 mb-1">Secure Payment</p>
              <p className="text-green-700">
                Your payment information is encrypted and secure. We use bank-level security to protect your data.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={handlePayment}
              disabled={!isFormValid() || loading}
            >
              {loading ? "Processing..." : `Pay $${doctor.consultationFee}`}
            </Button>
          </div>

          <p className="text-xs text-center text-gray-500">
            By confirming, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}