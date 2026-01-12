import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Icon from './ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface PlanType {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
}

const plans: PlanType[] = [
  {
    id: 'month',
    name: 'Premium Месяц',
    price: 299,
    period: 'месяц',
    features: [
      'Безлимитная отправка файлов до 2 ГБ',
      'Групповые звонки до 50 человек',
      'Приоритетная поддержка',
      'Эксклюзивные стикеры',
      'Темы оформления'
    ]
  },
  {
    id: 'year',
    name: 'Premium Год',
    price: 2499,
    period: 'год',
    popular: true,
    features: [
      'Все преимущества месячной подписки',
      'Экономия 30%',
      'Раннее тестирование функций',
      'Увеличенное облачное хранилище',
      'Значок Premium'
    ]
  }
];

export default function PaymentModal({ isOpen, onClose, onSuccess }: PaymentModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>('year');
  const [step, setStep] = useState<'plan' | 'payment' | 'success'>('plan');
  const [cardData, setCardData] = useState({
    number: '',
    holder: '',
    expiry: '',
    cvv: ''
  });

  const handlePayment = () => {
    setStep('success');
    setTimeout(() => {
      onSuccess();
      onClose();
      setStep('plan');
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {step === 'plan' && 'Выберите план Premium'}
            {step === 'payment' && 'Оплата подписки'}
            {step === 'success' && 'Оплата успешна! 🎉'}
          </DialogTitle>
        </DialogHeader>

        {step === 'plan' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-4">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
                    selectedPlan === plan.id
                      ? 'border-primary bg-primary/5 scale-105'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-full">
                      ПОПУЛЯРНО
                    </div>
                  )}
                  
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold">{plan.price}₽</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>

                  <h3 className="font-semibold text-lg mb-4">{plan.name}</h3>

                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-primary mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {selectedPlan === plan.id && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Icon name="Check" size={14} className="text-white" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="bg-muted/50 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={20} className="text-primary" />
                <span className="font-medium">Безопасная оплата</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Все платежи защищены SSL-шифрованием. Мы не храним данные вашей карты.
              </p>
            </div>

            <Button
              onClick={() => setStep('payment')}
              className="w-full h-12 bg-gradient-to-r from-primary to-secondary text-lg"
            >
              Перейти к оплате
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </Button>
          </div>
        )}

        {step === 'payment' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">
                  {plans.find(p => p.id === selectedPlan)?.name}
                </span>
                <span className="text-2xl font-bold">
                  {plans.find(p => p.id === selectedPlan)?.price}₽
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Подписка продлится автоматически
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Номер карты</label>
                <Input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.number}
                  onChange={(e) => setCardData({ 
                    ...cardData, 
                    number: formatCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))
                  })}
                  className="h-12"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Держатель карты</label>
                <Input
                  type="text"
                  placeholder="IVAN IVANOV"
                  value={cardData.holder}
                  onChange={(e) => setCardData({ ...cardData, holder: e.target.value.toUpperCase() })}
                  className="h-12"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Срок действия</label>
                  <Input
                    type="text"
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length >= 2) {
                        value = value.slice(0, 2) + '/' + value.slice(2, 4);
                      }
                      setCardData({ ...cardData, expiry: value });
                    }}
                    className="h-12"
                    maxLength={5}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">CVV</label>
                  <Input
                    type="text"
                    placeholder="123"
                    value={cardData.cvv}
                    onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                    className="h-12"
                    maxLength={3}
                  />
                </div>
              </div>
            </form>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep('plan')}
                className="flex-1 h-12"
              >
                <Icon name="ChevronLeft" className="mr-2" size={20} />
                Назад
              </Button>
              <Button
                onClick={handlePayment}
                disabled={!cardData.number || !cardData.holder || !cardData.expiry || !cardData.cvv}
                className="flex-1 h-12 bg-gradient-to-r from-primary to-secondary"
              >
                <Icon name="Lock" className="mr-2" size={20} />
                Оплатить
              </Button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center space-y-6 py-8 animate-scale-in">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <Icon name="Check" size={40} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Оплата прошла успешно!</h3>
              <p className="text-muted-foreground">
                Premium активирован. Наслаждайтесь всеми возможностями Rocket!
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
