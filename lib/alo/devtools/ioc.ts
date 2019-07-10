import {
  SingletonEntityCreatorDecorator,
  EntityCreator,
  Ioc,
  AbstractEntityCreatorDecorator,
  BlueprintCreateFunctionOptions,
  createBlueprint
} from "wald";
import { GlobalDevtoolsState } from ".";

class GlobalsEntityCreatorDecorator extends AbstractEntityCreatorDecorator {
  globals;
  constructor(options: { globals: { [key: string]: any }; entityCreator }) {
    super(options);

    this.globals = options.globals;
  }

  create(options) {
    options.create.globals = this.globals;

    return this.entityCreator.create(options);
  }
}

export const createGlobalBlueprintCreate = function<R = any>(
  globalKey: string
): (options: BlueprintCreateFunctionOptions) => R {
  return function(options) {
    return options.globals[globalKey] as any;
  };
};

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
  create: createGlobalBlueprintCreate<GlobalDevtoolsState>(
    "globalDevtoolsState"
  )
});
