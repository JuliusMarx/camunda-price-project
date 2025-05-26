import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PriceModel} from './Model/price.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'coffee-project';
  price: PriceModel = new PriceModel(0);

  ngOnInit(): void {
      this.coffeeFunction()
  }

  coffeeFunction() {
    const {Client, logger} = require("camunda-external-task-client-js");

    const config = {
      baseUrl: "http://localhost:8080/engine-rest",
      use: logger,
      asyncResponseTimeout: 10000,
    };

    const client = new Client(config);

    client.subscribe("price-topic", async ({task, taskService}) => {
      try {
        const price = task.variables.get("someVariable");
        console.log(`Received task with variable: ${price}`);

        await taskService.complete(task, {
          variables: {
            price,
          },
        });

        console.log("Task erfolgreich abgeschlossen!");
      } catch (error) {
        console.error("Fehler beim Verarbeiten des Tasks:", error);
      }
    })
  }
}
