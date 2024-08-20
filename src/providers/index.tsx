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
import { BlogProvider } from "./blog";
import { ComponentsProvider } from "./components";

interface IChildrenReact {
  children: ReactNode;
}

export function Providers({ children }: IChildrenReact) {
  return (
    <AuthProvider>
      <VehicleProvider>
        <UserProvider>
          <BlogProvider>
            <FuelProvider>
              <VehicleTypeProvider>
                <IncomingProvider>
                  <ExpenseServiceProvider>
                    <ExpenseTypeProvider>
                      <ExpenseVehicleProvider>
                        <AddressProvider>
                          <ComponentsProvider>
                            <ReminderProvider>{children}</ReminderProvider>
                          </ComponentsProvider>
                        </AddressProvider>
                      </ExpenseVehicleProvider>
                    </ExpenseTypeProvider>
                  </ExpenseServiceProvider>
                </IncomingProvider>
              </VehicleTypeProvider>
            </FuelProvider>
          </BlogProvider>
        </UserProvider>
      </VehicleProvider>
    </AuthProvider>
  );
}
