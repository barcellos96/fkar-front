"use client";

import { api } from "@/service/api";
import { parseCookies } from "nookies";
import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";

interface ReminderProps {
  id?: string;
  title: string;
  date_reminder?: string;
  km_reminder?: number;
  description: string;
}

interface PromiseReminder extends ReminderProps {
  user?: {
    id: string;
    email: string;
    isActive: boolean;
  };
  id: string;
  sent: boolean;
}

interface DeleteReminderProps {
  message: string;
  reminder_delete: ReminderProps;
}

interface IReminderData {
  reminder?: PromiseReminder[] | null;
  GetReminder: () => void;
  CreateReminder(data: ReminderProps): Promise<PromiseReminder>;
  value?: PromiseReminder;
  DeleteReminder(id: string): Promise<DeleteReminderProps>;
  UpdateReminder(id: string, data: ReminderProps): Promise<ReminderProps>;
}

interface ICihldrenReact {
  children: ReactNode;
}

export const ReminderContext = createContext<IReminderData>(
  {} as IReminderData
);

export const ReminderProvider = ({ children }: ICihldrenReact) => {
  const [reminder, setReminder] = useState<PromiseReminder[] | null>(null);
  const [value, setValue] = useState();

  const CreateReminder = async (
    data: ReminderProps
  ): Promise<PromiseReminder> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .post("/reminder", data, config)
      .then((res) => {
        setReminder(null);
        setValue(res.data);
        toast.success("Lembrete criado com sucesso!", {
          position: "top-right",
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, { position: "top-right" });
        return err;
      });

    return response;
  };

  const GetReminder = async () => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .get("/reminder", config)
      .then((res) => {
        setReminder(res.data.response);
      })
      .catch((err) => {
        toast.error(err.responde.data.message);
        return err;
      });

    return response;
  };

  const DeleteReminder = async (id: string): Promise<DeleteReminderProps> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };
    const response = await api
      .delete(`/reminder/${id}`, config)
      .then((res) => {
        setReminder(null);
        setValue(res.data);
        toast.success("Lembrete deletado com sucesso!", {
          position: "top-right",
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, { position: "top-right" });
        return err;
      });

    return response;
  };

  const UpdateReminder = async (
    id: string,
    data: ReminderProps
  ): Promise<ReminderProps> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };
    const response = await api
      .patch(`/reminder/${id}`, data, config)
      .then((res) => {
        setReminder(null);
        setValue(res.data);
        toast.success("Lembrete atualizado com sucesso!", {
          position: "top-right",
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, { position: "top-right" });
        return err;
      });

    return response;
  };

  return (
    <ReminderContext.Provider
      value={{
        value,
        reminder,
        GetReminder,
        DeleteReminder,
        CreateReminder,
        UpdateReminder,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
};
