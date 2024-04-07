import React, {useEffect, useState} from 'react';
import Button from "@/lib/components/Button.jsx";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex, Stack,
  VStack
} from "@chakra-ui/react";
import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
} from "chakra-react-select";

const IngredientsSelection = ({ preferences, ingredients }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    setSelectedIngredients(preferences.map(preference => preference.Ingredient));
  }, []);

  const handleSelectChange = (selectedOptions) => {
    setSelectedIngredients(selectedOptions);
    console.log(selectedOptions);
  }

  const handleSave = (selectedOptions) => {
    console.log(selectedOptions);
  }

  const handleCancel = () => {
    setSelectedIngredients(preferences.map(preference => {
      preference.Ingredient.id;
      preference.Ingredient.name
    }));
  }

  return (
    <div className={"grid gap-8"}>
      <ul className={"col-span-1"}>
        {preferences.map((preference) => (
          <li key={preference.id} className="flex items-center mb-2">
            <span className="ml-2">{preference.Ingredient.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsSelection;
