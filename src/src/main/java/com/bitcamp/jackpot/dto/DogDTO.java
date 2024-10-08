package com.bitcamp.jackpot.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DogDTO {
    private int dogId;

    private String name;

    private String species;

    private int age;

    private int gender;

    private int heart;

    private String videoUrl;

    private String dogDetail;

    private LocalDateTime regDate;
}
