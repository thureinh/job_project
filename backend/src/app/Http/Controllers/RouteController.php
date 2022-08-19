<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Location\LocationCollection;
use App\Http\Resources\Route\RouteCollection;
use App\Http\Resources\Ticket\TicketResource;
use Illuminate\Support\Facades\DB;
use App\Models\Location;
use App\Models\Route;
use App\Models\Ticket;
use Illuminate\Support\Str;

class RouteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->has(['field', 'sort'])) {
            return new RouteCollection(Route::orderBy($request->input('field'), $request->input('sort'))
                ->paginate(5));
        }
        return new RouteCollection(Route::orderBy('id', 'desc')->paginate(5));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Route::create($request->all());
        return new RouteCollection(Route::all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getLocations()
    {
        $locations = new Location();
        return new LocationCollection($locations->all());
    }

    public function isDuplicated(Request $request)
    {
        return response()->json([
            'duplicated' => Route::where('car_name', $request->input('name'))->count() > 0
        ]);
    }

    public function searchRoutes(Request $request)
    {
        $routes = Route::where('from', $request->input('from'))
            ->where('to', $request->input('to'))
            ->where('date', $request->input('date'))
            ->where('seat_count', '>=', $request->input('seat_count'))
            ->get();
        return new RouteCollection($routes);
    }

    public function getTicket(Request $request)
    {
        $id = $request->input('id');
        $seatCount = $request->input('seatCount');
        $maxCount = 1000;
        $code = Str::random(100);
        $count = 0;
        $isMaxReached = false;
        while (Ticket::where('code', $code)->count() > 0 && $maxCount > $count) {
            $code = Str::random(100);
            $count++;
            if ($count == $maxCount) $isMaxReached = true;
        }
        if ($isMaxReached)
            return response('Server can not process anymore', 500);

        $ticket = DB::transaction(function () use ($id, $seatCount, $code) {
            $route = Route::find($id);
            $route->seat_count = $route->seat_count - $seatCount;
            $route->save();
            return Ticket::create([
                'route_id'    => $id,
                'code' => $code
            ]);
        }, 5);

        return new TicketResource($ticket);
    }
}
