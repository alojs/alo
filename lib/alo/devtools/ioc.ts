import {
  SingletonEntityCreatorDecorator,
  EntityCreator,
  Ioc,
  createBlueprint,
  GlobalsEntityCreatorDecorator,
  createGlobalBlueprintCreateFn
} from "wald";
import { GlobalDevtoolsState } from ".";

export const createIoc = function({ globalDevtoolsState }) {
  let entityCreator = new EntityCreator();
  entityCreator = new SingletonEntityCreatorDecorator({ entityCreator });
  entityCreator = new GlobalsEntityCreatorDecorator({
    globals: {
      globalDevtoolsState
    },
    entityCreator
  });
  return new Ioc({ entityCreator });
};

export const GLOBAL_DEVTOOLS_STATE = createBlueprint({
  create: createGlobalBlueprintCreateFn<GlobalDevtoolsState>(
    "globalDevtoolsState"
  )
});
