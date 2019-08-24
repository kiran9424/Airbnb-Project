import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {

  @ViewChild('cardNumber', { static: true }) cardNumRef: ElementRef;
  @ViewChild('cardExp', { static: true }) cardExpRef: ElementRef;
  @ViewChild('cardCvc', { static: true }) cardCvcRef: ElementRef;

  @Output() paymentConfirmed = new EventEmitter();

  cardNumber: any;
  cardExp: any;
  cardCvc: any;
  stripe: any;
  elements: any;
  error: any;
  isValidating: boolean;
  token:any;


  constructor() {
    this.stripe = Stripe(environment.STRIPE_PK);
    this.elements = this.stripe.elements();
    this.onChange = this.onChange.bind(this);
  }

  ngOnInit() {
    this.cardNumber = this.elements.create('cardNumber', { style });
    this.cardNumber.mount(this.cardNumRef.nativeElement);

    this.cardExp = this.elements.create('cardExpiry', { style });
    this.cardExp.mount(this.cardExpRef.nativeElement);

    this.cardCvc = this.elements.create('cardCvc', { style });
    this.cardCvc.mount(this.cardCvcRef.nativeElement);

    this.cardNumber.addEventListener('change', this.onChange);
    this.cardExp.addEventListener('change', this.onChange);
    this.cardCvc.addEventListener('change', this.onChange);

  }

  ngOnDestroy() {
    this.cardNumber.removeEventListener('change', this.onChange);
    this.cardExp.removeEventListener('change', this.onChange);
    this.cardCvc.removeEventListener('change', this.onChange);

    this.cardNumber.destroy();
    this.cardExp.destroy();
    this.cardCvc.destroy();
  }

  async onSubmit() {
    this.isValidating = true;
    const { token, error } = await this.stripe.createToken(this.cardNumber);
    this.isValidating = false;
    if (error) {
      console.error(error);
    } else {
      this.token = token;
      this.paymentConfirmed.next(token);
    }
  }

  onChange(event) {
    const err = event.error;
    if (err) {
      this.error = err.message;
    } else {
      this.error = '';
    }
  }

  isCardValid() {
    return this.cardNumber._complete && this.cardExp._complete && this.cardCvc._complete;
  }

}

const style = {
  base: {
    iconColor: '#666EE8',
    color: '#31325F',
    lineHeight: '40px',
    fontWeight: 300,
    fontFamily: 'Helvetica Neue',
    fontSize: '15px',
    '::placeholder': {
      color: '#CFD7E0',
    },
  },
};