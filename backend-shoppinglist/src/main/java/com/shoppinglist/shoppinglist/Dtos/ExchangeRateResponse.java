package com.shoppinglist.shoppinglist.Dtos;

import java.math.BigDecimal;
import java.util.Map;

public record ExchangeRateResponse(
        String base_code,
        Map<String, BigDecimal> rates) {
}