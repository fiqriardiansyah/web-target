import CreditPng from '../asset/payment-credit.png';
import Debitpng from '../asset/payment-debit.png';
import Qrcodepng from '../asset/payment-qrcode.png';
import Transferpng from '../asset/payment-transfer.png';
import Tunaipng from '../asset/payment-tunai.png';
import Placeholderpng from '../asset/placeholder.png';

export const MAX_CUSTOM_PAYMENTS = 2;

export const PAYMENT_CHANNEL = {
    'TUNAI': { id: 6, img: Tunaipng, text: 'TUNAI' },
    'TRANSFER': { id: 7, img: Transferpng, text: 'TRANSFER' },
    'QRIS': { id: 8, img: Qrcodepng, text: 'QRIS' },
    'DEBIT': { id: 9, img: Debitpng, text: 'DEBIT' },
    'CREDIT': { id: 10, img: CreditPng, text: 'CREDIT' },
    'CUSTOM': { id: 11, img: Placeholderpng, text: 'CUSTOM' },
}