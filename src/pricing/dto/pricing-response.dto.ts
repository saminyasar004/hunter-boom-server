class AgentPriceDto {
  agentGroupId: number;
  agentGroupName: string;
  price: number;
}

class AgentGroupDto {
  id: number;
  name: string;
}

export class ProductPricingDto {
  productId: number;
  name: string;
  basePrice: number;
  agentPrices: { [key: string]: AgentPriceDto };
}

export class PricingResponseDto {
  products: ProductPricingDto[];
  agentGroups: AgentGroupDto[];
}
