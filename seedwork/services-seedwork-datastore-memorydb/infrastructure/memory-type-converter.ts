// import { BaseDataStructure } from '../interfaces/base';
// import { AggregateRoot } from '../../domain-seedwork/aggregate-root';
// import { TypeConverter } from '../../domain-seedwork/type-converter';
// import { EntityProps } from '../../domain-seedwork/entity';

// export abstract class MemoryTypeConverter<
//   ContextType, 
//   MemoryDataStructure extends BaseDataStructure,
//   DomainPropInterface extends EntityProps,
//   DomainType extends AggregateRoot<DomainPropInterface>
//   > implements TypeConverter<MemoryDataStructure, DomainType,DomainPropInterface,ContextType> 
// {
//   constructor(
//     private adapter: new(args:MemoryDataStructure) => DomainPropInterface,
//     private domainObject: new(args:DomainPropInterface, context:ContextType) => DomainType
//   ) {}

//   toPersistence(domainType: DomainType): MemoryDataStructure {
//     return domainType.props as any as MemoryDataStructure;
//   }
//   toDomain(memoryDataStructure: MemoryDataStructure, context:ContextType): DomainType {
//     if(!memoryDataStructure) { return null;}
//     return new this.domainObject(this.toAdapter(memoryDataStructure), context);
//   }
//   toAdapter(memoryDataStructure: MemoryDataStructure | DomainType): DomainPropInterface {
//     if(memoryDataStructure instanceof this.domainObject) {
//       return memoryDataStructure.props;
//     }
//     return new this.adapter(memoryDataStructure as MemoryDataStructure);
//   }
// }
{}