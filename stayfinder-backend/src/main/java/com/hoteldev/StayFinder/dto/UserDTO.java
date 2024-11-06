package com.hoteldev.StayFinder.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
public class UserDTO {
    private Long id;
    private String email;
    private String name;
    private String phoneNumber;
    private String  role;
    private List<BookingDTO> bookings = new ArrayList<>();
}
