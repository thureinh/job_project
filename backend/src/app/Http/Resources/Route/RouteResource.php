<?php

namespace App\Http\Resources\Route;

use Illuminate\Http\Resources\Json\JsonResource;

class RouteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'         => $this->id,
            'car_name'   => $this->car_name,
            'from'       => $this->fromLocation,
            'to'         => $this->toLocation,
            'date'       => $this->date,
            'seat_count' => $this->seat_count,
        ];
    }
}