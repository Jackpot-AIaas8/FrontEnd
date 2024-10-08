package com.bitcamp.jackpot.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EntityListeners(AuditingEntityListener.class)
public class Dog extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int dogId;

    @Column(length = 10,nullable = false)
    private String name;

    @Column(length = 20,nullable = false)
    private String species;

    @Column(nullable = false)
    private int age;

    @Column(nullable = false)
    private int gender;

    @Column(nullable = false)
    private int heart;

    @Column(length = 20, nullable = false)
    private String videoUrl;

    @Column(length = 100, nullable = false)
    private String dogDetail;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime regDate;
}
