import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import mercadopago from 'mercadopago'
import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model'
import { PaymentInfo } from 'src/internal/domain/dto/payment'

@Injectable()
export class MercadoPagoService {
  constructor(private configService: ConfigService) {
    mercadopago.configure({
      access_token: this.configService.get<string>('mercadoPago.token'),
    })
  }

  async processPayment({
    amount,
    user,
    carModel,
    reservation,
  }: PaymentInfo): Promise<boolean> {
    const preference: CreatePreferencePayload = {
      items: [
        {
          title: `Reserva de alquiler de auto (${carModel} Date: (${reservation.startDate} - ${reservation.endDate}))`,
          quantity: 1,
          currency_id: 'USD',
          unit_price: amount,
        },
      ],
      payer: {
        name: user.name,
        email: user.email,
      },
      // back_urls: {
      //   success: 'https://tu-app.com/pago-exitoso',
      //   failure: 'https://tu-app.com/pago-fallido',
      //   pending: 'https://tu-app.com/pago-pendiente',
      // },
      //auto_return: 'approved',
    }

    try {
      const response = await mercadopago.preferences.create(preference)
      console.log(response)
      if (response.status === 201) {
        return true
      } else {
        return false
      }
    } catch (err) {
      console.error(err)
      return false
    }
  }
}
