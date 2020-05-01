import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { split } from "apollo-link";

interface Definition {
  kind: string;
  operation?: string;
};

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    ApolloModule,
    HttpLinkModule,
    HttpClientModule
  ]
})
export class GraphqlModule {
  constructor(apollo: Apollo, httpClient: HttpClient) {
    // Configurar la url principal con el link
    const httpLink = new HttpLink(httpClient).create({
      uri: "http://localhost:8000/graphql",
    });

    // Configura el websocket con el link

    const subscriptionLink = new WebSocketLink({
      uri: "ws://localhost:8000/graphql",
      options: {
        reconnect: true,
      },
    });

    // Unir las 2 conexiones
    const link = split(
      ({ query }) => {
        const { kind, operation }: Definition = getMainDefinition(query);
        return kind === "OperationDefinition" && operation === "subscription";
      },
      subscriptionLink,
      httpLink
    );

    // Crear conexión

    apollo.create({
      link,
      cache: new InMemoryCache(),
    });
  }
}
