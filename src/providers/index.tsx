import { ReactNode } from "react";
import { AuthProvider } from "./auth";
import { UserProvider } from "./user";
import { ExpenseProvider } from "./expense";
import { IncomingProvider } from "./incoming";
import { VehicleProvider } from "./vehicle";
import { FuelProvider } from "./fuel";
import { AddressProvider } from "./address";

interface IChildrenReact {
  children: ReactNode;
}

export function Providers({ children }: IChildrenReact) {
  return (
    <AuthProvider>
      <UserProvider>
        <FuelProvider>
          <VehicleProvider>
            <IncomingProvider>
              <ExpenseProvider>
                <AddressProvider>{children}</AddressProvider>
              </ExpenseProvider>
            </IncomingProvider>
          </VehicleProvider>
        </FuelProvider>
      </UserProvider>
    </AuthProvider>
  );
}
