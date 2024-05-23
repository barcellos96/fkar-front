import { ReactNode } from "react";
import { AuthProvider } from "./auth";
import { UserProvider } from "./user";
import { ExpenseTypeProvider } from "./expense/expenseType";
import { IncomingProvider } from "./incoming";
import { VehicleTypeProvider } from "./vehicle/vehicleType";
import { FuelProvider } from "./fuel";
import { AddressProvider } from "./address";
import { ReminderProvider } from "./reminder";
import { VehicleProvider } from "./vehicle/vehicle";
import { ExpenseVehicleProvider } from "./expense/expenseVehicle";

interface IChildrenReact {
  children: ReactNode;
}

export function Providers({ children }: IChildrenReact) {
  return (
    <AuthProvider>
      <UserProvider>
        <FuelProvider>
          <VehicleTypeProvider>
            <VehicleProvider>
              <IncomingProvider>
                <ExpenseTypeProvider>
                  <ExpenseVehicleProvider>
                    <AddressProvider>
                      <ReminderProvider>{children}</ReminderProvider>
                    </AddressProvider>
                  </ExpenseVehicleProvider>
                </ExpenseTypeProvider>
              </IncomingProvider>
            </VehicleProvider>
          </VehicleTypeProvider>
        </FuelProvider>
      </UserProvider>
    </AuthProvider>
  );
}
