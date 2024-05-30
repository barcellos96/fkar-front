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
import { ExpenseServiceProvider } from "./expense/expenseService";

interface IChildrenReact {
  children: ReactNode;
}

export function Providers({ children }: IChildrenReact) {
  return (
    <AuthProvider>
      <VehicleProvider>
        <UserProvider>
          <FuelProvider>
            <VehicleTypeProvider>
              <IncomingProvider>
                <ExpenseServiceProvider>
                  <ExpenseTypeProvider>
                    <ExpenseVehicleProvider>
                      <AddressProvider>
                        <ReminderProvider>{children}</ReminderProvider>
                      </AddressProvider>
                    </ExpenseVehicleProvider>
                  </ExpenseTypeProvider>
                </ExpenseServiceProvider>
              </IncomingProvider>
            </VehicleTypeProvider>
          </FuelProvider>
        </UserProvider>
      </VehicleProvider>
    </AuthProvider>
  );
}
