package com.hoteldev.StayFinder.service.interfac;

import com.hoteldev.StayFinder.dto.Response;
import com.hoteldev.StayFinder.entity.Booking;

public interface IBookingService {
    Response saveBooking(Long roomId, Long userId, Booking bookingRequest);
    Response findBookingByConfirmationCode(String confirmationCode);
    Response getAllBookings();
    Response cancelBooking(Long bookingId);
}
