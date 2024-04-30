import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Database, object, ref } from '@angular/fire/database';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage{

  valorLDR: number = 0;

  constructor(private database: Database) {}

  ngOnInit() {
    const route = ref(this.database, 'cantLuz');
    object(route).subscribe(attributes=> {
      const valorRef = attributes.snapshot.val();
     
      this.valorLDR = valorRef;
      console.log(this.valorLDR);
    });

    if (this.valorLDR > 1000) {
      this.notificacionDia()
    } else if (this.valorLDR < 1000) {
      this.notificacionNoche()
    }
  }


  async notificacionDia() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Amaneció",
          body: "¡Muy buenos días estrellitas, la tierra les dice hola!",
          id: 1,
          schedule:{ }
        }
      ]
    });
  }

  async notificacionNoche() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Anocheció!",
          body: "¡A dormir, A dormir, A dormir!",
          id: 2,
          schedule:{ }
        }
      ]
    });
  }
  
}
