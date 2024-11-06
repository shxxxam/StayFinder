package com.hoteldev.StayFinder.service.interfac;

import com.hoteldev.StayFinder.dto.LoginRequest;
import com.hoteldev.StayFinder.dto.Response;
import com.hoteldev.StayFinder.entity.User;

public interface IUserService {
    Response register(User user);
    Response login(LoginRequest loginRequest);
    Response getAllUsers();
    Response getUSerBookingHistory(String userId);
    Response deleteUser(String userId);
    Response getUserById(String userId);
    Response getMyInfo(String email);
}
