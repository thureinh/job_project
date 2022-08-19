<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Route extends Model
{
    use HasFactory;

    protected $table = 'routes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'car_name',
        'from',
        'to',
        'date',
        'seat_count'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [];

    public function fromLocation()
    {
        return $this->belongsTo(Location::class, 'from', 'id');
    }

    public function toLocation()
    {
        return $this->belongsTo(Location::class, 'to', 'id');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'route_id', 'id');
    }
}
