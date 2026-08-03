package com.shoppinglist.shoppinglist.Services;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Currency;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.shoppinglist.shoppinglist.Dtos.ExchangeRateResponse;

@Service
public class CurrencyService {

        private static final long CACHE_TTL_SECONDS = 3600;

        private final RestClient restClient;
        private final Map<String, CachedRate> cache = new ConcurrentHashMap<>();

        public CurrencyService(RestClient.Builder builder) {
                this.restClient = builder
                                .baseUrl("https://open.er-api.com/v6")
                                .build();
        }

        public BigDecimal convert(
                        BigDecimal amount,
                        Currency from,
                        Currency to) {

                if (from.equals(to)) {
                        return amount;
                }

                return amount.multiply(getRate(from, to));
        }

        public BigDecimal getRate(Currency from, Currency to) {
                if (from.equals(to)) {
                        return BigDecimal.ONE;
                }

                String key = from.getCurrencyCode() + ":" + to.getCurrencyCode();
                CachedRate cached = cache.get(key);

                if (cached != null && !cached.isExpired()) {
                        return cached.rate();
                }

                BigDecimal rate = fetchRate(from, to);
                cache.put(key, new CachedRate(rate, Instant.now()));
                return rate;
        }

        private BigDecimal fetchRate(Currency from, Currency to) {
                ExchangeRateResponse response = restClient.get()
                                .uri("/latest/{from}",
                                                from.getCurrencyCode())
                                .retrieve()
                                .body(ExchangeRateResponse.class);

                BigDecimal rate = response.rates()
                                .get(to.getCurrencyCode());

                if (rate == null) {
                        throw new RuntimeException(
                                        "Conversion impossible");
                }

                return rate;
        }

        private record CachedRate(BigDecimal rate, Instant timestamp) {
                boolean isExpired() {
                        return Instant.now()
                                        .isAfter(timestamp.plusSeconds(CACHE_TTL_SECONDS));
                }
        }
}
