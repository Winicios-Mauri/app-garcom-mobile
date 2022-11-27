import { useState } from "react";
import { Modal, TouchableOpacity, Platform } from "react-native";
import { Button } from "../Button";
import { Close } from "../Icons/Close";

import { Text } from "../Text";

import { OverLay, ModalBody, Header, Form, Input } from "./styles";

interface TableModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export function TableModal({ visible, onClose, onSave } : TableModalProps) {
  const [ table, setTable] = useState("");

  function handleSave(){
    onSave(table);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <OverLay behavior={Platform.OS === "android" ? "height" : "padding"}>
        <ModalBody>
          <Header>
            <Text>Informe a Mesa</Text>
            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </Header>

          <Form>
            <Input
              placeholder="Número da Messa"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              onChangeText={setTable}
            />
            <Button
              onPress={handleSave}
              disabled={table.length === 0}
            >
              Salvar
            </Button>
          </Form>
        </ModalBody>
      </OverLay>
    </Modal>
  );
}